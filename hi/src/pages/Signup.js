import React from "react";
import styled from "styled-components";
import { Text, Button, Input } from "../pages/elements/element";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../pages/redux/modules/user";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { actionCreators } from "../pages/redux/modules/user";
import Text1 from "../pages/elements/Text1";
import { getCookie } from "../pages/shared/Cookie";
import Swal from "sweetalert2";
import axios from "axios";
import { useCallback, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import '../pages/Signup.css';
import {
  usernameCheck,
  pwdCheck,
  nicknameCheck,
  emailCheck,
  phoneNumberCheck,
  postcodeCheck,
  addressCheck,
  detailedAddressCheck,
  lastNameKorCheck,
  firstNameKorCheck,
  lastNameEngCheck,
  firstNameEngCheck,
  genderCheck,
  birthDateCheck
} from "../pages/shared/common";

const Signup = (props) => {
  const _email = useRef("");
  const _authnum = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //아이디, 비밀번호, 비밀번호 확인, 이름, 이메일 확인
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  //const [passwordCheck, setPasswordCheck] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [postcode, setPostcode] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [detailedAddress, setDetailedAddress] = React.useState("");
  const [lastNameKor, setLastNameKor] = React.useState("");
  const [firstNameKor, setFirstNameKor] = React.useState("");
  const [lastNameEng, setLastNameEng] = React.useState("");
  const [firstNameEng, setFirstNameEng] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");

  //아이디, 이메일 중복검사
  const [username_check, setUsernameCheck] = React.useState(false);
  const [email_check, setEmailCheck] = React.useState(false);
  const [nickname_check, setNickname_check] = React.useState(false);

  //이메일 중복 아닐 때, 인증번호 창 보이게 하기
  const [show, setShow] = React.useState(false);

  // 이메일 중복 확인 실패
  const [emailDoubleFail, SetEmailDoubleFail] = React.useState(""); 

  // 이메일 중복 확인
  const [emailDoubleCheck, SetEmailDoubleCheck] = React.useState(""); 

  // 인증번호 일치
  const [AuthCorrect, SetAuthCorrect] = React.useState(null);

  // 인증번호 불일치
  const [AuthFail, SetAuthFail] = React.useState("");

  const [validate, setValidate] = React.useState(false);
  

  const email_regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const [authnumber, setAuthNumber] = React.useState("");
  const onChangeAuthnumber = useCallback((e) => setAuthNumber(e.target.value), []);
  
  const onChangeEmail = useCallback((e) => setEmail(e.target.value), []);
  // const isMobile = useMediaQuery({
  //   query: "(max-width: 767px)",
  // });
  // const checkUsername = (e) => {
  //   setUsername(e.target.value);
  //   if (username_check) {
  //     setUsernameCheck(false);
  //   }
  // };
  // console.log("username : ", username);
  // console.log("password: ", password);
  // console.log("passwordCheck : ", passwordCheck);
  // console.log("nickname: ", nickname);
  // console.log("email: ", email);

  // const checkEmail = (e) => {
  //   setEmail(e.target.value);
  //   if (email_check) {
  //     setEmailCheck(false);
  //   }
  // };
  // console.log("email_check : ", email_check);

  const GetAuthNumAPI = (email) => {
    const API = `/user/email`;
    axios
      .post(API, {
        email: email
      })
      .then((res) => {
        console.log(res)
        if (res.data==="인증번호 전송") {
          console.log(res.data==="인증번호 전송")
          setShow(true);
          // SetEmailDoubleCheck("사용 가능한 이메일입니다");
          // SetEmailDoubleFail("");
          Swal.fire({
                icon: 'success',
                title: "사용 가능한 이메일입니다",
                confirmButtonColor: "#668FA1",
                confirmButtonText: "확인",
              });
        } else {
          // SetEmailDoubleFail("이미 존재하는 ID입니다!");
          // SetEmailDoubleCheck("");
          Swal.fire({
            icon: 'warning',
            title: "이미 존재하는 이메일입니다",
            confirmButtonColor: "#668FA1",
            confirmButtonText: "확인",
          });
        }
        if (email === "") {
          Swal.fire({
            title: "이메일을 입력해주세요!",
            text: '인증번호를 받으실 이메일을 입력해 주세요.',
            confirmButtonColor: "#668FA1",
            confirmButtonText: "확인",
            icon: 'warning'
          });
          // _email.current.focus();
        }
        if (!email_regExp.test(email)) {
          Swal.fire({
            icon: 'warning',
            title: "이메일 형식이 맞지 않습니다!",
            confirmButtonColor: "#668FA1",
            confirmButtonText: "확인",
          });
          // _email.current.focus();
        }
       return
      })
      .catch((err) => {
        console.log("GetAuthNumAPI에서 오류", err);
      });
  };

  const EmailValidationAPI = (email, authnumber, checkNum) => {
    const AUTH_API = `/user/email/check`;
    axios
      .post(AUTH_API, {
        email: email,
        checkNum: Number(authnumber),
      })
      .then((res) => {
        if (res.data==="인증 완료") {
          console.log(res.data==="인증 완료")
          // SetAuthCorrect("인증번호가 일치합니다");
          SetAuthFail("");
          setShow(true);
          setValidate(true);
          Swal.fire({
            icon: 'success',
            title: "인증번호가 일치합니다",
            confirmButtonColor: "#668FA1",
            confirmButtonText: "확인",
          });
        } else {
          SetAuthCorrect("");
          // SetAuthFail("인증번호가 불일치합니다");
          Swal.fire({
            icon: 'warning',
            title: "인증번호가 불일치합니다",
            confirmButtonColor: "#668FA1",
            confirmButtonText: "확인",
          });
        }
        if (res.data==="인증번호를 요청해주세요") {
          Swal.fire({
            icon: 'warning',
            title: "인증번호를 입력해주세요!",
            confirmButtonColor: "#668FA1",
            confirmButtonText: "확인",
          });
          // _email.current.focus();
          return;
        }
      })
      .catch((err) => {
        console.log("EmailValidationAPI에서 오류", err);
      });
  };


  const checkUsername = () => {
    if (!usernameCheck(username)) {
      // alert("아이디 형식이 맞지 않습니다");
      Swal.fire({
        icon: 'warning',
        title: "아이디 형식이 맞지 않습니다",
        confirmButtonColor: "#668FA1",
        confirmButtonText: "확인",
      });
      return;
    }
    dispatch(userActions.usernameCheckF(username));
  };

  // const checkEmail = () => {
  //   if (!emailCheck(email)) {
  //     alert("이메일 형식이 맞지 않습니다");
  //     return;
  //   }
  //   dispatch(userActions.emailCheckF(email));
  // };

  const checkNickname = () => {
    if (!nicknameCheck(nickname)) {
      // alert("닉네임 형식이 맞지 않습니다");
      Swal.fire({
        icon: 'warning',
        title: "닉네임 형식이 맞지 않습니다",
        confirmButtonColor: "#668FA1",
        confirmButtonText: "확인",
      });
      return;
    }
    dispatch(userActions.nicknameCheckF(nickname));
  };

  //회원가입 시 입력 누락된 내역 있을 시 alert 띄워줌
  const signup = () => {
    if (
      username === "" ||
      password === "" ||
      //passwordCheck === "" ||
      email === "" ||
      nickname === "" ||
      phoneNumber === "" ||
      postcode === "" ||
      address === "" ||
      detailedAddress === "" ||
      lastNameKor === "" ||
      firstNameKor === "" ||
      lastNameEng === "" ||
      firstNameEng === "" ||
      gender === "" ||
      birthDate === ""
    ) {
      // window.alert("입력하지 않은 칸이 있습니다");
      Swal.fire({
        title: "입력하지 않은 칸이 있습니다",
        confirmButtonColor: "#668FA1",
        confirmButtonText: "확인",
        icon: "warning"
      });
      return;
    }

    //아이디 중복검사
    if (!username_check) {
      console.log(username_check)
      // window.alert("아이디나 이메일의 중복검사가 되지 않았습니다!");
      Swal.fire({
        icon: 'warning',
        title: "아이디 중복검사가 </br>되지 않았습니다!",
        confirmButtonColor: "#668FA1",
        confirmButtonText: "확인",
      });
      return;
    }

    //닉네임 중복검사
    if (!nickname_check) {
      console.log(nickname_check)
      // window.alert("아이디나 이메일의 중복검사가 되지 않았습니다!");
      Swal.fire({
        icon: 'warning',
        title: "닉네임 중복검사가 </br>되지 않았습니다!",
        confirmButtonColor: "#668FA1",
        confirmButtonText: "확인",
      });
      return;
    }

    if (!validate) {
      Swal.fire({
        icon: 'warning',
        title: "이메일 인증이 되지 않았습니다",
        confirmButtonColor: "#668FA1",
        confirmButtonText: "확인",
      });
      return;
    }
    // //아이디, 이메일 중복검사
    // if (username_check) {
    //   // window.alert("아이디나 이메일의 중복검사가 되지 않았습니다!");
    //   Swal.fire({
    //     icon: 'warning',
    //     title: "닉네임 중복검사가 </br>되지 않았습니다!",
    //     confirmButtonColor: "#668FA1",
    //     confirmButtonText: "확인",
    //   });
    // }

    //회원가입 시 아이디, 비밀번호, 비밀번호 확인, 이름, 이메일 유효성 검사
    if (!usernameCheck(username)) {
      window.alert("아이디 형식이 맞지 않습니다");
      return;
    }

    if (!pwdCheck(password)) {
      window.alert("비밀번호 형식이 맞지 않습니다");
      return;
    }

    {/*if (password !== passwordCheck) {
      window.alert("비밀번호와 비밀번호 확인이 일치하지 않습니다");
      return;
    }
  */}
    if (!nicknameCheck(nickname)) {
      window.alert("이름 형식이 맞지 않습니다");
      return;
    }

    // if (!emailCheck(email)) {
    //   window.alert("잘못된 이메일 형식입니다");
    //   return;
    // }

    if (!phoneNumberCheck(phoneNumber)) {
      window.alert("잘못된 전화번호 형식입니다");
      return;
    }

    if (!postcodeCheck(postcode)) {
      window.alert("잘못된 우편번호 형식입니다");
      return;
    }

    if (!addressCheck(address)) {
      window.alert("잘못된 주소 형식입니다");
      return;
    }

    if (!detailedAddressCheck(detailedAddress)) {
      window.alert("잘못된 상세 주소 형식입니다");
      return;
    }

    if (!lastNameKorCheck(lastNameKor)) {
      window.alert("잘못된 이름(성) 형식입니다");
      return;
    }

    if (!firstNameKorCheck(firstNameKor)) {
      window.alert("잘못된 이름 형식입니다");
      return;
    }

    if (!lastNameEngCheck(lastNameEng)) {
      window.alert("잘못된 영문 이름(성) 형식입니다");
      return;
    }

    if (!firstNameEngCheck(firstNameEng)) {
      window.alert("잘못된 영문 이름 형식입니다");
      return;
    }

    if (!genderCheck(gender)) {
      window.alert("잘못된 성별 형식입니다");
      return;
    }

    if (!birthDateCheck(birthDate)) {
      window.alert("잘못된 생년월일 형식입니다");
      return;
    }
    
    //signupDB에 회원가입 시 입력한 내역들을 보내주기
    dispatch(
      userActions.signupDB(username, password, nickname, email,  phoneNumber, postcode, address, detailedAddress,
        lastNameKor, firstNameKor, lastNameEng, firstNameEng, gender, birthDate)
    );
  };

  const is_login = getCookie("is_login");
const is_token = getCookie("Authorization");

if (is_login && is_token) {
  const username = getCookie("username");
  return (
    <div className="Signup">
      <div className='signheadercontainer'>
      <div className="signcontainer">
        <div className="signheader">
          <div className="signheaderlogo">
          <Link to="/">하이</Link>
            <div className='signheadermenu1'>
            <Link to="/AcmList">숙소</Link>
            </div>
            <div className='signheadermenu2'>
            <Link to="/Join">커뮤니티</Link>
            </div>
            <div className='signheadermenu3'>
            <Text1
                onClick={() => {
                  navigate("/signup");
                }}
                color="purple"
              >
                회원가입 
              </Text1>
              <Text1
                onClick={() => {
                  navigate("/login");
                }}
                color="black"
              >
                로그인 
              </Text1>
            </div>
            </div>
            </div>
            </div>
            </div>
            <Link to="/AcmList"></Link>
    <div className="signcontainer">
      <Title>JOIN NOW</Title>
      {/* <RequiredBox>
        <Text size="12px" color="#666666">
          <CheckSpan>*</CheckSpan>필수입력사항
        </Text>
      </RequiredBox> */}
      {/* <Line /> */}
      <div className="signtext">회원정보 입력
      </div>
      <div className="signtext2">필수정보 입력</div>
      <SignupTable>
        {/* <tbody> */}
            <div className="signup">
              <div className="signtext3">아이디 <CheckSpan>*</CheckSpan></div>
              <div className="signtext7">
              <Input
                placeholder="6자 이상의 영문 혹은 영문과 숫자를 조합"
                padding="14px"
                width="332px"
                _onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <Button
                margin="0px 0px 0px 40px"
                borderColor="3px solid #DCDCDC"
                bg="#ffffff"
                color="#535353"
                width="120px"
                _onClick={() => {
                  checkUsername();
                  setUsernameCheck(true)}}
              >
                ID 중복확인
              </Button>
              </div>
              {/* {username !== "" && !usernameCheck(username) && (
                <InfoUl className="checkId">
                  <li>• 6자 이상의 영문 혹은 영문과 숫자를 조합</li>
                  <li>• 아이디 중복확인</li>
                </InfoUl>
              )}
              {username !== "" && usernameCheck(username) && (
                <InfoUl className="checkId">
                  <li>✓ 6자 이상의 영문 혹은 영문과 숫자를 조합</li>
                  <li>• 아이디 중복확인</li>
                </InfoUl>
              )} */}
            </div>
            
          <div className="signtext3">비밀번호 <CheckSpan>*</CheckSpan></div>
            <div className="signtext7">
              <Input
                placeholder="10자 이상의 최소 하나의 문자, 숫자 및 특수 문자를 조합"
                type="password"
                padding="14px"
                width="332px"
                _onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              </div>
              {/* {password !== "" && !pwdCheck(password) && (
                <InfoUl className="checkPw">
                  <li>• 10글자 이상 입력</li>
                  <li>
                    • 영문/숫자/특수문자(공백 제외)만 허용, 2개 이상의 조합
                  </li>
                  <li>• 동일한 숫자 3개 이상 연속 사용 불가</li>
                </InfoUl>
              )}
              {password !== "" && pwdCheck(password) && (
                <InfoUl className="checkPw">
                  <li>✓ 10글자 이상 입력</li>
                  <li>
                    ✓ 영문/숫자/특수문자(공백 제외)만 허용, 2개 이상의 조합
                  </li>
                  <li>✓ 동일한 숫자 3개 이상 연속 사용 불가</li>
                </InfoUl>
              )} */}
           <tr>
          {/*<div className="signtext6">비밀번호확인 <CheckSpan>*</CheckSpan></div>
              <Input
                placeholder="비밀번호를 한번 더 입력해주세요"
                type="password"
                padding="14px"
                width="332px"
                _onChange={(e) => {
                  setPasswordCheck(e.target.value);
                }}
              />
              */}
              {/* {password !== "" && !pwdCheck(passwordCheck) && (
                <InfoUl className="ReCheckPw">
                  <li>• 동일한 비밀번호를 입력해주세요.</li>
                </InfoUl>
              )}
              {password !== "" && pwdCheck(passwordCheck) && (
                <InfoUl className="ReCheckPw">
                  <li>✓ 동일한 비밀번호를 입력해주세요.</li>
                </InfoUl>
              )} */}
          </tr>
          <div className="signtext3">닉네임 <CheckSpan>*</CheckSpan></div>
          <div className="signtext7">
              <Input
                placeholder="닉네임을 입력해주세요"
                padding="14px"
                width="332px"
                _onChange={(e) => {
                  setNickname(e.target.value);
                }}
              />
              <Button
                margin="0px 0px 0px 40px"
                borderColor="3px solid #DCDCDC"
                bg="#ffffff"
                color="#535353"
                width="120px"
                disabled={nickname_check ? true : false}
                _onClick={() => {
                  checkNickname();
                  setNickname_check(true)
                  }}
              >
                닉네임 중복확인
              </Button>
           </div>   
         <div className="signtext3">이메일 <CheckSpan>*</CheckSpan></div>
         <div className="signtext7">
         <Input placeholder="이메일을 입력해주세요" padding="14px" width="332px" value={email} _onChange={onChangeEmail} />
                    <Button
                    margin="0px 0px 0px 40px"
                    borderColor="3px solid #DCDCDC"
                    bg="#ffffff"
                    color="#535353"
                    width="120px"
                      _onClick={() => {
                        GetAuthNumAPI(email);
                      }}
                      tabIndex="0"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          GetAuthNumAPI(email);
                        }
                      }}
                    >
                      인증하기
                    </Button>
                
              </div>
              {/* <p className="availableEmail">{emailDoubleCheck}</p>
              <p className="availableFail">{emailDoubleFail}</p> */}

              {show && (
                <>
                  <div className="signtext3">인증번호 <CheckSpan>*</CheckSpan></div>
                  <div className="signtext7">
                    <Input placeholder="인증번호를 입력해주세요" padding="14px" width="332px" value={authnumber} _onChange={onChangeAuthnumber} ref={_authnum} />
                    <Button
                    margin="0px 0px 0px 40px"
                    borderColor="3px solid #DCDCDC"
                    bg="#ffffff"
                    color="#535353"
                    width="120px"
                      _onClick={() => {
                        EmailValidationAPI(email, authnumber);
                      }}
                      tabIndex="0"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          EmailValidationAPI(email, authnumber);
                        }
                      }}
                    >
                      인증번호 확인
                    </Button>
                    </div>
                  <p className="availableEmail">{AuthCorrect}</p>
                  <p className="availableFail">{AuthFail}</p>
                </>
              )}
              
            <div className="signtext3">전화번호 <CheckSpan>*</CheckSpan></div>
             <div className="signtext7">
              <Input
                placeholder="전화번호를 입력해주세요"
                padding="14px"
                width="332px"
                _onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
              </div>
              <div className="signtext3">주소 <CheckSpan>*</CheckSpan></div>
              <div className="signtext7">
              <Input
                placeholder="우편번호를 입력해주세요"
                padding="14px"
                width="332px"
                _onChange={(e) => {
                  setPostcode(e.target.value);
                }}
              />
              </div>
               <div className="signtext9">
              <Input
                placeholder="주소를 입력해주세요"
                padding="14px"
                width="332px"
                _onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
              </div>
              <div className="signtext8">
              <Input
                placeholder="상세 주소를 입력해주세요"
                padding="14px"
                width="332px"
                _onChange={(e) => {
                  setDetailedAddress(e.target.value);
                }}
              />
              </div>
              <div className="signtext3">이름 <CheckSpan>*</CheckSpan></div>
              <div className="signtext7">
              <Input
                placeholder="성"
                padding="14px"
                width="332px"
                _onChange={(e) => {
                  setLastNameKor(e.target.value);
                }}
              />
              </div>
              <div className="signtext10">
              <Input
                placeholder="이름"
                padding="14px"
                width="332px"
                _onChange={(e) => {
                  setFirstNameKor(e.target.value);
                }}
              />
              </div>
              <div className="signtext3">영문 이름 <CheckSpan>*</CheckSpan></div>
              <div className="signtext7">
              <Input
                placeholder="성"
                padding="14px"
                width="332px"
                _onChange={(e) => {
                  setLastNameEng(e.target.value);
                }}
              />
              </div>
              <div className="signtext10">
              <Input
                placeholder="이름"
                padding="14px"
                width="332px"
                _onChange={(e) => {
                  setFirstNameEng(e.target.value);
                }}
              />
              </div>
              <div className="signtext3">성별 <CheckSpan>*</CheckSpan></div>
              <div className="signtext7">
              <Input
                placeholder="남성 MALE 여성 FEMALE로 입력해주세요"
                padding="14px"
                width="332px"
                _onChange={(e) => {
                  setGender(e.target.value);
                }}
              />
          </div>
          <div className="signtext3">생년월일 <CheckSpan>*</CheckSpan></div>
              <div className="signtext7">
              <Input
                placeholder="예: 20220101"
                padding="14px"
                width="332px"
                _onChange={(e) => {
                  setBirthDate(e.target.value);
                }}
              />
              </div>
          {/* 
      <div className="username">
        <input
          label="아이디"
          placeholder="6자 이상의 영문 혹은 영문과 숫자를 조합"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        /> */}

          {/* {username !== "" && !username(username) && (
        <text color="red">아이디 형식이 올바르지 않습니다!</text>
      )}
      {username !== "" && username(username) && (
        <text color="green">사용할 수 있는 아이디 형식입니다!</text>
      )} */}

          {/* <button
          width="100px"
          margin="0 0 0 10px"
          disabled={username_check ? true : false}
          onClick={() => checkUsername()}
        >
          중복확인
        </button> */}

          {/* <div className="password">
        <input
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        /> */}
          {/* {password !== "" && !pwdCheck(password) && (
        <div color="red">
          비밀번호는 최소 8자 이상으로 최소 하나의 문자, 하나의 숫자 및 하나의
          특수 문자를 포함하여야 합니다.
        </div>
      )} */}
          {/* {password !== "" && pwdCheck(password) && (
        <div color="green">올바른 비밀번호 형식입니다.</div>
      )} */}
          {/* </div>
      <div className="password-check">
        <input
          label="비밀번호 확인"
          placeholder="비밀번호를 한번 더 입력해주세요"
          type="password"
          onChange={(e) => {
            setPasswordCheck(e.target.value);
          }}
        />
      </div> */}

          {/* <div className="name">
        <input
          label="이름"
          placeholder="이름을 입력해주세요"
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        ></input>
      </div> */}

          {/* <div className="email">
        <input
          label="이메일"
          placeholder="예: marketkurly@kurly.com"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        /> */}
          {/* {username !== "" && !emailCheck(username) && (
        <div color="red">이메일 형식이 올바르지 않습니다!</div>
      )}
      {username !== "" && emailCheck(username) && (
        <div color="green">사용할 수 있는 이메일 형식입니다!</div>
      )} */}
          {/* <button
          width="100px"
          height="45px"
          margin="0 0 0 10px"
          disabled={email_check ? true : false}
          onClick={() => checkEmail()}
        >
          중복확인
        </button>
      </div> */}
        {/* </tbody> */}
      </SignupTable>
      <Button width="240px" borderColor="3px solid #668FA1" bg="#668FA1" margin="123px 0px 305px 123px;" _onClick={() => signup()}>
        가입하기
      </Button>
      </div>
    <div className='footerbg'>
          <div className='footer'>
          <div className='footer1'>
          <a href='#1'>고객센터</a>
          </div>
          <div className='footer2'>
            서울특별시 구로구 경인로 445
          </div>
          <div className='footer3'>
            대표이사 김경찬
            <div className='footer5'>
            <div className='footer4'>
             T. 02-2610-1700
             </div>
          </div>
          </div>
          <div className='footerline'></div>
          <div className='footer6'>
          copyright ⓒ 하이 all right reserved.
          </div>
          </div>
        </div>
    </div>
  );
};

return (
  <div className="Signup">
    <div className='signheadercontainer'>
    <div className="signcontainer">
      <div className="signheader">
        <div className="signheaderlogo">
        <Link to="/">하이</Link>
          <div className='signheadermenu1'>
          <Link to="/AcmList">숙소</Link>
          </div>
          <div className='signheadermenu2'>
          <Link to="/Join">커뮤니티</Link>
          </div>
          <div className='signheadermenu3'>
          <Text1
              onClick={() => {
                navigate("/signup");
              }}
              color="purple"
            >
              회원가입 
            </Text1>
            <Text1
              onClick={() => {
                navigate("/login");
              }}
              color="black"
            >
              로그인 
            </Text1>
          </div>
          </div>
          </div>
          </div>
          </div>
          <Link to="/AcmList"></Link>
  <div className="signcontainer">
    <Title>JOIN NOW</Title>
    {/* <RequiredBox>
      <Text size="12px" color="#666666">
        <CheckSpan>*</CheckSpan>필수입력사항
      </Text>
    </RequiredBox> */}
    {/* <Line /> */}
    <div className="signtext">회원정보 입력
    </div>
    <div className="signtext2">필수정보 입력</div>
    <SignupTable>
      {/* <tbody> */}
          <div className="signup">
            <div className="signtext3">아이디 <CheckSpan>*</CheckSpan></div>
            <div className="signtext7">
            <Input
              placeholder="6자 이상의 영문 혹은 영문과 숫자를 조합"
              padding="14px"
              width="332px"
              _onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <Button
              margin="0px 0px 0px 40px"
              borderColor="3px solid #DCDCDC"
              bg="#ffffff"
              color="#535353"
              width="120px"
              // disabled={username_check ? true : false}
              _onClick={() => {
                checkUsername();
                setUsernameCheck(true)}}
            >
              ID 중복확인
            </Button>
            </div>
            {/* {username !== "" && !usernameCheck(username) && (
              <InfoUl className="checkId">
                <li>• 6자 이상의 영문 혹은 영문과 숫자를 조합</li>
                <li>• 아이디 중복확인</li>
              </InfoUl>
            )}
            {username !== "" && usernameCheck(username) && (
              <InfoUl className="checkId">
                <li>✓ 6자 이상의 영문 혹은 영문과 숫자를 조합</li>
                <li>• 아이디 중복확인</li>
              </InfoUl>
            )} */}
          </div>
          
        <div className="signtext3">비밀번호 <CheckSpan>*</CheckSpan></div>
          <div className="signtext7">
            <Input
              placeholder="10자 이상의 최소 하나의 문자, 숫자 및 특수 문자를 조합"
              type="password"
              padding="14px"
              width="332px"
              _onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            </div>
            {/* {password !== "" && !pwdCheck(password) && (
              <InfoUl className="checkPw">
                <li>• 10글자 이상 입력</li>
                <li>
                  • 영문/숫자/특수문자(공백 제외)만 허용, 2개 이상의 조합
                </li>
                <li>• 동일한 숫자 3개 이상 연속 사용 불가</li>
              </InfoUl>
            )}
            {password !== "" && pwdCheck(password) && (
              <InfoUl className="checkPw">
                <li>✓ 10글자 이상 입력</li>
                <li>
                  ✓ 영문/숫자/특수문자(공백 제외)만 허용, 2개 이상의 조합
                </li>
                <li>✓ 동일한 숫자 3개 이상 연속 사용 불가</li>
              </InfoUl>
            )} */}
         <tr>
        {/*<div className="signtext6">비밀번호확인 <CheckSpan>*</CheckSpan></div>
            <Input
              placeholder="비밀번호를 한번 더 입력해주세요"
              type="password"
              padding="14px"
              width="332px"
              _onChange={(e) => {
                setPasswordCheck(e.target.value);
              }}
            />
            */}
            {/* {password !== "" && !pwdCheck(passwordCheck) && (
              <InfoUl className="ReCheckPw">
                <li>• 동일한 비밀번호를 입력해주세요.</li>
              </InfoUl>
            )}
            {password !== "" && pwdCheck(passwordCheck) && (
              <InfoUl className="ReCheckPw">
                <li>✓ 동일한 비밀번호를 입력해주세요.</li>
              </InfoUl>
            )} */}
        </tr>
        <div className="signtext3">닉네임 <CheckSpan>*</CheckSpan></div>
        <div className="signtext7">
            <Input
              placeholder="닉네임을 입력해주세요"
              padding="14px"
              width="332px"
              _onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
            <Button
              margin="0px 0px 0px 40px"
              borderColor="3px solid #DCDCDC"
              bg="#ffffff"
              color="#535353"
              width="120px"
              _onClick={() => {
                checkNickname();
                setNickname_check(true)}}
            >
              닉네임 중복확인
            </Button>
         </div>   
        <div className="signtext3">이메일 <CheckSpan>*</CheckSpan></div>
        <div className="signtext7">
         <Input placeholder="이메일을 입력해주세요" padding="14px" width="332px" value={email} _onChange={onChangeEmail} />
                    <Button
                    margin="0px 0px 0px 40px"
                    borderColor="3px solid #DCDCDC"
                    bg="#ffffff"
                    color="#535353"
                    width="120px"
                      _onClick={() => {
                        GetAuthNumAPI(email);
                      }}
                      tabIndex="0"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          GetAuthNumAPI(email);
                        }
                      }}
                    >
                      인증하기
                    </Button>
                
              <p className="availableEmail">{emailDoubleCheck}</p>
              <p className="availableFail">{emailDoubleFail}</p>

              {show && (
                <>
                  <div className="signtext3">인증번호 <CheckSpan>*</CheckSpan></div>
                  <div className="signtext7">
                    <Input placeholder="인증번호를 입력해주세요" padding="14px" width="332px" value={authnumber} _onChange={onChangeAuthnumber} ref={_authnum} />
                    <Button
                    margin="0px 0px 0px 40px"
                    borderColor="3px solid #DCDCDC"
                    bg="#ffffff"
                    color="#535353"
                    width="120px"
                      _onClick={() => {
                        EmailValidationAPI(email, authnumber);
                      }}
                      tabIndex="0"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          EmailValidationAPI(email, authnumber);
                        }
                      }}
                    >
                      인증번호 확인
                    </Button>
                    </div>
                  <p className="availableEmail">{AuthCorrect}</p>
                  <p className="availableFail">{AuthFail}</p>
                </>
              )}
            </div>
          <div className="signtext3">전화번호 <CheckSpan>*</CheckSpan></div>
           <div className="signtext7">
            <Input
              placeholder="전화번호를 입력해주세요"
              padding="14px"
              width="332px"
              _onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
            </div>
            <div className="signtext3">주소 <CheckSpan>*</CheckSpan></div>
            <div className="signtext7">
            <Input
              placeholder="우편번호를 입력해주세요"
              padding="14px"
              width="332px"
              _onChange={(e) => {
                setPostcode(e.target.value);
              }}
            />
            </div>
             <div className="signtext9">
            <Input
              placeholder="주소를 입력해주세요"
              padding="14px"
              width="332px"
              _onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            </div>
            <div className="signtext8">
            <Input
              placeholder="상세 주소를 입력해주세요"
              padding="14px"
              width="332px"
              _onChange={(e) => {
                setDetailedAddress(e.target.value);
              }}
            />
            </div>
            <div className="signtext3">이름 <CheckSpan>*</CheckSpan></div>
            <div className="signtext7">
            <Input
              placeholder="성"
              padding="14px"
              width="332px"
              _onChange={(e) => {
                setLastNameKor(e.target.value);
              }}
            />
            </div>
            <div className="signtext10">
            <Input
              placeholder="이름"
              padding="14px"
              width="332px"
              _onChange={(e) => {
                setFirstNameKor(e.target.value);
              }}
            />
            </div>
            <div className="signtext3">영문 이름 <CheckSpan>*</CheckSpan></div>
            <div className="signtext7">
            <Input
              placeholder="성"
              padding="14px"
              width="332px"
              _onChange={(e) => {
                setLastNameEng(e.target.value);
              }}
            />
            </div>
            <div className="signtext10">
            <Input
              placeholder="이름"
              padding="14px"
              width="332px"
              _onChange={(e) => {
                setFirstNameEng(e.target.value);
              }}
            />
            </div>
            <div className="signtext3">성별 <CheckSpan>*</CheckSpan></div>
            <div className="signtext7">
            <Input
              placeholder="남성 MALE 여성 FEMALE로 입력해주세요"
              padding="14px"
              width="332px"
              _onChange={(e) => {
                setGender(e.target.value);
              }}
            />
        </div>
        <div className="signtext3">생년월일 <CheckSpan>*</CheckSpan></div>
              <div className="signtext7">
              <Input
                placeholder="예: 20220101"
                padding="14px"
                width="332px"
                _onChange={(e) => {
                  setBirthDate(e.target.value);
                }}
              />
              </div>
        {/* 
    <div className="username">
      <input
        label="아이디"
        placeholder="6자 이상의 영문 혹은 영문과 숫자를 조합"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      /> */}

        {/* {username !== "" && !username(username) && (
      <text color="red">아이디 형식이 올바르지 않습니다!</text>
    )}
    {username !== "" && username(username) && (
      <text color="green">사용할 수 있는 아이디 형식입니다!</text>
    )} */}

        {/* <button
        width="100px"
        margin="0 0 0 10px"
        disabled={username_check ? true : false}
        onClick={() => checkUsername()}
      >
        중복확인
      </button> */}

        {/* <div className="password">
      <input
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      /> */}
        {/* {password !== "" && !pwdCheck(password) && (
      <div color="red">
        비밀번호는 최소 8자 이상으로 최소 하나의 문자, 하나의 숫자 및 하나의
        특수 문자를 포함하여야 합니다.
      </div>
    )} */}
        {/* {password !== "" && pwdCheck(password) && (
      <div color="green">올바른 비밀번호 형식입니다.</div>
    )} */}
        {/* </div>
    <div className="password-check">
      <input
        label="비밀번호 확인"
        placeholder="비밀번호를 한번 더 입력해주세요"
        type="password"
        onChange={(e) => {
          setPasswordCheck(e.target.value);
        }}
      />
    </div> */}

        {/* <div className="name">
      <input
        label="이름"
        placeholder="이름을 입력해주세요"
        onChange={(e) => {
          setNickname(e.target.value);
        }}
      ></input>
    </div> */}

        {/* <div className="email">
      <input
        label="이메일"
        placeholder="예: marketkurly@kurly.com"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      /> */}
        {/* {username !== "" && !emailCheck(username) && (
      <div color="red">이메일 형식이 올바르지 않습니다!</div>
    )}
    {username !== "" && emailCheck(username) && (
      <div color="green">사용할 수 있는 이메일 형식입니다!</div>
    )} */}
        {/* <button
        width="100px"
        height="45px"
        margin="0 0 0 10px"
        disabled={email_check ? true : false}
        onClick={() => checkEmail()}
      >
        중복확인
      </button>
    </div> */}
      {/* </tbody> */}
    </SignupTable>
    <Button width="240px" borderColor="3px solid #668FA1" bg="#668FA1" margin="123px 0px 305px 123px;" _onClick={() => signup()}>
      가입하기
    </Button>
    </div>
  <div className='footerbg'>
        <div className='footer'>
        <div className='footer1'>
        <a href='#1'>고객센터</a>
        </div>
        <div className='footer2'>
          서울특별시 구로구 경인로 445
        </div>
        <div className='footer3'>
          대표이사 김경찬
          <div className='footer5'>
          <div className='footer4'>
           T. 02-2610-1700
           </div>
        </div>
        </div>
        <div className='footerline'></div>
        <div className='footer6'>
        copyright ⓒ 하이 all right reserved.
        </div>
        </div>
      </div>
  </div>
);
};

Signup.defaultProps = {};

const Container = styled.div`
  width: 640px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  justify-content: center;
  flex-direction: column;
  padding: 5px 0px 120px 0px;
`;

const Title = styled.div`
  font-size: 55px;
  float:left;
  margin-top: 166px;
  font-family: 'Noto Serif KR';
  color:#668FA1;
`;

const RequiredBox = styled.div`
  text-align: right;
  width: 100%;
  margin: 10px 0px 0px 0px;
`;

const CheckSpan = styled.span`
  color: #535353;
  font-family:'Gowun Dodum';
  font-size:25px;
`;

const Line = styled.span`
  display: block;
  width: 100%;
  height: 2px;
  background-color: #333333;
  margin-top: -2px;
`;

const SignupTable = styled.table`
  // margin-top: 10px;
  padding-bottom: 49px;
  width: 100%;
  & tr {
    text-align: left;
    font-size: 14px;
    font-weight: 500;
    float:left;

  }
  & td {
    position: relative;
    padding-bottom: 16px;
    float:left;
  }
  & td:nth-child(1) {
    box-sizing: border-box;
    padding: 15px 0px 0px 18px;
    width: 152px;
    vertical-align: top;
  }
`;

const InfoUl = styled.ul`
  font-size: 12px;
  color: #666666;
  position: relative;
  left: -37px;
  font-weight: 400;
  list-style: none;
  margin-top: 4px;
`;

const VerifyNum = styled.div`
  width: 110px;
  height: 24px;
  margin: 0px 285px 0px 31px;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #2f2f2f;
  text-decoration: underline;
  cursor: pointer;

  @media (max-width: 767px) {
    font-size: 12px;
    margin: 0px;
    text-align: center;
  }

  @media (min-width: 768px) and (max-width: 1199px) {
    font-size: 12px;
    margin: 0px;
    width: 100px;
    margin-left: 30px;
    text-align: center;
  }
`;

export default Signup;
