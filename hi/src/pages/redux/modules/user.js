import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom'
import Swal from "sweetalert2";


// 액션
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const VALIDATE_EMAIL = "VALIDATE_EMAIL";
const DELETE_USER = 'DELETE_USER';
const UPDATE_USER = 'UPDATE_USER';
const FIND_ID = "FIND_ID"; //아이디 찾기
// const LOAD_TOKEN = "LOAD_TOKEN";

// 초기값
const initialState = {
  userInfo: {
    username: "",
    firstNameKor: "",
  },
  is_login: false,
};

// 액션 생성 함수
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const validateEmail = createAction(VALIDATE_EMAIL, (user) => ({ user }));
const deleteUser = createAction(DELETE_USER, () => ({}));
const updateUser = createAction(UPDATE_USER, (user) => ({ user }));
const findid = createAction(FIND_ID, (email) => ({ email }));


const usernameCheckF = (username) => {
  return function (dispatch, getState) {
    console.log(username);
    axios({
      method: "get",
      url: `/user/username/${username}`,
      data: {
        username: username
      },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          // window.alert("사용 가능한 아이디입니다");
          Swal.fire({
            icon: 'success',
            title: "사용 가능한 아이디입니다",
            confirmButtonColor: "#668FA1",
            confirmButtonText: "확인",
          });
        } else {
          // window.alert("이미 사용 중인 아이디입니다");
          Swal.fire({
            icon: 'warning',
            title: "이미 사용 중인 아이디입니다",
            confirmButtonColor: "#668FA1",
            confirmButtonText: "확인",
          });
        }
      })
      .catch((err) => {
        console.log("아이디 중복", err);
        // window.alert("아이디 중복확인에 문제가 생겼습니다");
        Swal.fire({
          icon: 'error',
          title: "아이디 중복확인에 문제가 생겼습니다",
          confirmButtonColor: "#668FA1",
          confirmButtonText: "확인",
        });
      });
  };
};

// const emailCheckF = (email) => {
//   return function (dispatch, getState) {
//     console.log(email);
//     axios({
//       method: "post",
//       url: "/join",
//       data: {
//         email: email,
//       },
//     })
//       .then((res) => {
//         if (!res.data) {
//           window.alert("사용 가능한 이메일입니다");
//         } else {
//           window.alert("이미 사용 중인 이메일입니다");
//         }
//       })
//       .catch((err) => {
//         console.log("이메일 중복", err);
//         window.alert("이메일 중복확인에 문제가 생겼습니다");
//       });
//   };
// };

const EmailValidationAPI = (email, authnumber) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: `/user/email/check`,
      data: {
        email: email,
        checkNum: Number(authnumber),
      },
    })
      .then((res) => {
        if (res.data.msg === "success") {
          dispatch(validateEmail(true));
        } else {
          Swal.fire({
            icon: 'warning',
            title: "인증번호가 일치하지 않습니다.",
            confirmButtonColor: "#d6d6d6",
          });
        }
      })
      .catch((err) => {
        console.log("EmailValidationAPI에서 오류 발생", err);
      });
  };
};

const nicknameCheckF = (nickname) => {
  return function (dispatch, getState) {
    console.log(nickname);
    axios({
      method: "get",
      url: `/user/nickname/${nickname}`,
      data: {
        nickname: nickname
      },
    })
      .then((res) => {
        // console.log(res.data==="true")
        if (res.data) {
          // window.alert("사용 가능한 닉네임입니다");
          Swal.fire({
            icon: 'success',
            title: "사용 가능한 닉네임입니다",
            confirmButtonColor: "#668FA1",
            confirmButtonText: "확인",
          });
        } else {
          // window.alert("이미 사용 중인 닉네임입니다");
          Swal.fire({
            icon: 'warning',
            title: "이미 사용 중인 닉네임입니다",
            confirmButtonColor: "#668FA1",
            confirmButtonText: "확인",
          });
        }
      })
      .catch((err) => {
        console.log("닉네임 중복", err);
        // window.alert("닉네임 중복확인에 문제가 생겼습니다");
        Swal.fire({
          icon: 'error',
          title: "닉네임 중복확인에 문제가 생겼습니다",
          confirmButtonColor: "#668FA1",
          confirmButtonText: "확인",
        });
      });
      
  };
};

const signupDB = (username, password, nickname, email, phoneNumber, postcode, address, detailedAddress,
  lastNameKor, firstNameKor, lastNameEng, firstNameEng, gender, birthDate) => {
  return async function (dispatch, getState, { history }) {
    console.log(
      "id : " + username,
      "pwd : " + password,
      "nickname : " + nickname,
      "email : " + email,
      "phoneNumber : " + phoneNumber,
      "postcode : " + postcode,
      "address : " + address,
      "detailedAddress : " + detailedAddress,
      "lastNameKor : " + lastNameKor,
      "firstNameKor : " + firstNameKor,
      "lastNameEng : " + lastNameEng,
      "firstNameEng : " + firstNameEng,
      "gender : " + gender,
      "birthDate : " + birthDate
    );
    try {
      const signup = await axios.post("/user/join", {
        username: username,
        password: password,
        //passwordCheck: passwordCheck,
        nickname: nickname,
        email: email,
        phoneNumber: phoneNumber,
        postcode: postcode,
        address: address,
        detailedAddress: detailedAddress,
        lastNameKor: lastNameKor,
        firstNameKor: firstNameKor,
        lastNameEng: lastNameEng,
        firstNameEng: firstNameEng,
        gender: gender,
        birthDate: birthDate
        //회원가입 시 서버로 해당 값들 보냄
      });
      console.log(signup);

      // if (signup.data.result === true) {
      //   window.alert("성공적으로 회원가입하셨습니다");
      //   window.location.replace("/login");
      //   //회원가입 완료 시 login 페이지로 이동
      // } else if (signup.data.result === false) {
      //   window.alert(signup.data.errorMessage);
      //   window.location.replace("/signup");

      //   //회원가입 실패 시 다시 signup 페이지로 이동
      // }
      // window.alert("성공적으로 회원가입 하셨습니다");
      Swal.fire({
        icon: 'success',
        title: "성공적으로 회원가입 하셨습니다",
        confirmButtonColor: "#668FA1",
        confirmButtonText: "확인",
      }).then(function(){
        
        window.location.replace("/login");
      })
      
    } catch (err) {
      alert("회원가입에 실패했습니다.");
      console.log(err);
    }
  };
};

//아이디 찾기
const Findid = (email, birthDate) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: `/user/findUsername`,
      data: {
        email: email,
        birthDate: birthDate,
      },
    })
      .then((res) => {
        if (res.data.msg === "success") {
          dispatch(findid(email));
          const email = getCookie("email", email);
          Swal.fire({
            title: "가입하신 이메일로 아이디를 보내드렸습니다",
            confirmButtonColor: "#3fbe81",
            confirmButtonText: "확인",
          });
          history.push("/pwdchange");
        } else {
          Swal.fire({
            title: "메일이 존재하지 않습니다!",
            confirmButtonColor: "#d6d6d6",
            confirmButtonText: "확인",
          });
        }
      })
      .catch((err) => {
        console.log("FindPwdAPI에서 오류 발생", err);
      });
  };
};

const updateDB = (password, nickname, email, phoneNumber, postcode, address, detailedAddress) => {
  return async function (dispatch, getState, { history }) {
    console.log(
      "pwd : " + password,
      "nickname : " + nickname,
      "email : " + email,
      "phoneNumber : " + phoneNumber,
      "postcode : " + postcode,
      "address : " + address,
      "detailedAddress : " + detailedAddress,
    );
    try {
      const jwtToken = getCookie('Authorization');
    // 새로고침 하면 헤더 default 날라가므로 다시 헤더에 토큰을 담아줌
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
    console.log(jwtToken)
      const signup = await axios.put("/user/update", {
        password: password,
        //passwordCheck: passwordCheck,
        nickname: nickname,
        email: email,
        phoneNumber: phoneNumber,
        postcode: postcode,
        address: address,
        detailedAddress: detailedAddress,
        //수정 시 서버로 해당 값들 보냄
      });
      console.log(signup);

      // if (signup.data.result === true) {
      //   window.alert("성공적으로 회원가입하셨습니다");
      //   window.location.replace("/login");
      //   //회원가입 완료 시 login 페이지로 이동
      // } else if (signup.data.result === false) {
      //   window.alert(signup.data.errorMessage);
      //   window.location.replace("/signup");

      //   //회원가입 실패 시 다시 signup 페이지로 이동
      // }
      // window.alert("성공적으로 회원가입 하셨습니다");
      Swal.fire({
        icon: 'success',
        title: "성공적으로 회원정보를 </br>수정 하셨습니다",
        confirmButtonColor: "#668FA1",
        confirmButtonText: "확인",
      }).then(function(){
        
        window.location.replace("/");
      })
      
    } catch (err) {
      alert("수정에 실패했습니다.");
      console.log(err);
    }
  };
};


// 변경할 데이터를 서버에 보내줌
const updateUserDB = (password, nickname, email, phoneNumber, postcode, address, detailedAddress) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: 'put',
      url: `/user/update`,
      data: {
        password: password,
        nickname: nickname,
        email: email,
        phoneNumber: phoneNumber,
        postcode: postcode,
        address: address,
        detailedAddress: detailedAddress
      },
    })
      .then((res) => {
        // 스토어에서도 최신 데이터로 변경
        dispatch(
          updateUser({
            password: password,
            nickname: nickname,
            email: email,
            phoneNumber: phoneNumber,
            postcode: postcode,
            address: address,
            detailedAddress: detailedAddress
          }),
        );
        window.alert('회원정보가 변경되었습니다!');
        window.location.replace("/");
      })
      .catch((e) => {
        console.log('에러발생', e);
      });
  };
};



// 로그인 미들웨어
const loginDB = (username, password) => {
  console.log(username, password);
  return function (dispatch, getState, { history }) {
    
    axios
      .post("/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        //토큰만 걸러내기
        console.log(response.headers.authorization.split(" ")[1]);
        //받아온 토큰 속에서 유저네임 찾아내기!
        const DecodedToken = jwtDecode(
          response.headers.authorization.split(" ")[1]
        );
        console.log(DecodedToken.USER_NAME);

        setCookie(
          "Authorization",
          response.headers.authorization.split(" ")[1]
        );
        setCookie("username", username);
        // setCookie("firstNameKor", DecodedToken.USER_NAME);
        const jwtToken = response.data;
        setCookie('is_login', jwtToken);
        // 통신 시 헤더에 default로 저장
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        dispatch(
          logIn({
            is_login: true,
            username: username,
            // firstNameKor: DecodedToken.USER_NAME,
          })
        );
        Swal.fire({
          icon: 'success',
          title: `${username}님 환영합니다.`,
          confirmButtonColor: "#668FA1",
          confirmButtonText: "확인",
        }).then(function(){
          
        window.location.replace("/");
        })
        // window.alert(`${DecodedToken.USER_NAME}님 환영합니다.`);
        // window.alert(`${username}님 환영합니다.`);
        
      })
      .catch((error) => {
        // window.alert("아이디와 비밀번호를 다시한번 확인해주세요.");
        Swal.fire({
          icon: 'warning',
          title: "아이디와 비밀번호를 <br/>다시한번 확인해주세요.",
          confirmButtonColor: "#668FA1",
          confirmButtonText: "확인",
        });
        console.log("Login Error", error);
      });
  };
};

// const getUserDB = () => {
//   return function (dispatch, getState, { history }) {
//     // 토큰 값 조회
//     const jwtToken = getCookie('is_login');
//     // 새로고침 하면 헤더 default 날라가므로 다시 헤더에 토큰을 담아줌
//     axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
//     axios({
//       method: 'get',
//       url: `${config.api}/api/user`,
//     })
//       .then((res) => {
//         // 받은 유저 정보 저장
//         dispatch(
//           getUser({
//             username: res.data.userName,
//             name: res.data.nickName,
//             email: res.data.email,
//             phone: res.data.phone,
//           }),
//         );
//       })
//       .catch((e) => {
//         console.log('에러발생', e);
//       });
//   };
// };

// 로그아웃 미들웨어
const logoutDB = () => {
  return function (dispatch, getState, { history }) {
    deleteCookie("is_login");
    deleteCookie("Authorization");
    deleteCookie("username");
    dispatch(logOut());
    window.location.replace("/");
  };
};


const deleteUserDB = () => {
  return function (dispatch, getState, { history }) {
    const jwtToken = getCookie('Authorization');
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
    console.log(jwtToken)
    axios({
      method: 'delete',
      url: `/user/delete`,
    }).then((res) => {
      dispatch(deleteUser());
      Swal.fire({
        icon: 'success',
        title: "회원탈퇴가 완료되었습니다",
        confirmButtonColor: "#668FA1",
        confirmButtonText: "확인",
      }).then(function(){
        window.location.replace("/");
      })
    });
  };
};



// 리듀서
export default handleActions(
  {
    [DELETE_USER]: (state, action) =>
            produce(state, (draft) => {
                // 회원 탈퇴 시 쿠키에 담긴 토큰 삭제, 회원정보 비워줌, 로그인 여부 false
                deleteCookie('is_login');
                draft.user = null;
                draft.is_Login = false;
            }),
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        console.log("유저정보" ,state, action.payload);
        setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");

        draft.user = null;
        draft.is_login = false;
      }),
      [VALIDATE_EMAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.is_email_validate = action.payload.user;
      }),
      [FIND_ID]: (state, action) =>
      produce(state, (draft) => {
        draft.email = action.payload.email;
      }),
      
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreators = {
  logIn,
  logOut,
  getUser,
  signupDB,
  loginDB,
  logoutDB,
  usernameCheckF,
  nicknameCheckF,
  EmailValidationAPI,
  updateDB,
  // updateUserDB,
  deleteUserDB,
  deleteUser
};


export { actionCreators };
