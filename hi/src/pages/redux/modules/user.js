import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import { useNavigate } from "react-router-dom";



// 액션
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
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



// const usernameCheckF = (username) => {
//   return function (dispatch, getState) {
//     console.log(username);
//     axios({
//       method: "post",
//       url: "/join",
//       data: {
//         username: username,
//       },
//     })
//       .then((res) => {
//         console.log(res.data);
//         if (!res.data) {
//           window.alert("사용 가능한 아이디입니다");
//         } else {
//           window.alert("이미 사용 중인 아이디입니다");
//         }
//       })
//       .catch((err) => {
//         console.log("아이디 중복", err);
//         window.alert("아이디 중복확인에 문제가 생겼습니다");
//       });
//   };
// };

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

// const nicknameCheckF = (nickname) => {
//   return function (dispatch, getState) {
//     console.log(nickname);
//     axios({
//       method: "post",
//       url: "/join",
//       data: {
//         nickname: nickname,
//       },
//     })
//       .then((res) => {
//         if (!res.data) {
//           window.alert("사용 가능한 닉네임입니다");
//         } else {
//           window.alert("이미 사용 중인 닉네임입니다");
//         }
//       })
//       .catch((err) => {
//         console.log("닉네임 중복", err);
//         window.alert("닉네임 중복확인에 문제가 생겼습니다");
//       });
//   };
// };

const signupDB = (username, password, nickname, email, phoneNumber, postcode, address, detailedAddress,
  lastNameKor, firstNameKor, lastNameEng, firstNameEng, gender) => {
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
      "gender : " + gender
    );
    try {
      const signup = await axios.post("/join", {
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
        gender: gender
        //회원가입 시 서버로 해당 값들 보냄
      });
      console.log(signup);

      if (signup.data.result === true) {
        window.alert("성공적으로 회원가입하셨습니다");
        window.location.replace("/login");
        //회원가입 완료 시 login 페이지로 이동
      } else if (signup.data.result === false) {
        window.alert(signup.data.errorMessage);
        window.location.replace("/signup");

        //회원가입 실패 시 다시 signup 페이지로 이동
      }
    } catch (err) {
      alert("회원가입에 실패했습니다.");
      console.log(err);
    }
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
        setCookie("firstNameKor", DecodedToken.USER_NAME);
        dispatch(
          logIn({
            is_login: true,
            username: username,
            firstNameKor: DecodedToken.USER_NAME,
          })
        );

        window.location.replace("/");
        // window.alert(`${DecodedToken.USER_NAME}님 환영합니다.`);
        window.alert(`${username}님 환영합니다.`);
      })
      .catch((error) => {
        window.alert("아이디와 비밀번호를 다시한번 확인해주세요.");
        console.log("Login Error", error);
      });
  };
};

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


// 리듀서
export default handleActions(
  {
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
};


export { actionCreators };
