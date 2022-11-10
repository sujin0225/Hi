import "./ChangeUserInfo.css";
import { Routes, Route, Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react';
import Text1 from "../pages/elements/Text1";
import { useDispatch } from "react-redux";
import { actionCreators } from "../pages/redux/modules/user";
import { useNavigate } from 'react-router-dom';
import { getCookie } from "../pages/shared/Cookie";
import styled from "styled-components";
import { Text, Button, Input } from "../pages/elements/element";
import React from "react";
import Swal from "sweetalert2";
import { actionCreators as userActions } from "../pages/redux/modules/user";
import axios from "axios";
import { useCallback } from "react";
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


function ChangeUserInfo(){
    const [입력값, 입력값변경] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const is_login = getCookie("is_login");
    const is_token = getCookie("Authorization");
    const [username, setUsername] = React.useState("");
    const [username_check, setUsernameCheck] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [nickname, setNickname] = React.useState("");
    const [nickname_check, setNickname_check] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const email_regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const [email, setEmail] = React.useState("");
    const onChangeEmail = useCallback((e) => setEmail(e.target.value), []);
    const [AuthFail, SetAuthFail] = React.useState("");
    const [validate, setValidate] = React.useState(false);
    const [AuthCorrect, SetAuthCorrect] = React.useState(null);
    const [authnumber, setAuthNumber] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [postcode, setPostcode] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [detailedAddress, setDetailedAddress] = React.useState("");
    const onChangeAuthnumber = useCallback((e) => setAuthNumber(e.target.value), []);
    const _authnum = useRef();
    const [lastNameKor, setLastNameKor] = React.useState("");
    const [firstNameKor, setFirstNameKor] = React.useState("");
    const [lastNameEng, setLastNameEng] = React.useState("");
    const [firstNameEng, setFirstNameEng] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [birthDate, setBirthDate] = React.useState("");

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

    const update = () => {
  
      // //닉네임 중복검사
      // if (!nickname_check) {
      //   console.log(nickname_check)
      //   // window.alert("아이디나 이메일의 중복검사가 되지 않았습니다!");
      //   Swal.fire({
      //     icon: 'warning',
      //     title: "닉네임 중복검사가 </br>되지 않았습니다!",
      //     confirmButtonColor: "#668FA1",
      //     confirmButtonText: "확인",
      //   });
      //   return;
      // }
  
      // if (!validate) {
      //   Swal.fire({
      //     icon: 'warning',
      //     title: "이메일 인증이 되지 않았습니다",
      //     confirmButtonColor: "#668FA1",
      //     confirmButtonText: "확인",
      //   });
      //   return;
      // }

      // if (!pwdCheck(password)) {
      //   window.alert("비밀번호 형식이 맞지 않습니다");
      //   return;
      // }
  
      // if (!phoneNumberCheck(phoneNumber)) {
      //   window.alert("잘못된 전화번호 형식입니다");
      //   return;
      // }
  
      // if (!postcodeCheck(postcode)) {
      //   window.alert("잘못된 우편번호 형식입니다");
      //   return;
      // }
  
      // if (!addressCheck(address)) {
      //   window.alert("잘못된 주소 형식입니다");
      //   return;
      // }
  
      // if (!detailedAddressCheck(detailedAddress)) {
      //   window.alert("잘못된 상세 주소 형식입니다");
      //   return;
      // }
  
      //updateDB에 수정사항 보내주기
      dispatch(
        userActions.updateDB(password, nickname, email,  phoneNumber, postcode, address, detailedAddress)
      );
    };
  

    if (is_login && is_token) {
      const username = getCookie("username");    
return(
    <div className="ChangeUserInfo">
      <div className='UserInfoheadercontainer'>
      <div className="UserInfocontainer">
        <div className="UserInfoheader">
          <div className="UserInfoheaderlogo">
          <Link to="/">하이</Link>
            <div className='UserInfoheadermenu1'>
            <Link to="/AcmList">숙소</Link>
            </div>
            <div className='UserInfoheadermenu2'>
            <Link to="/Join">커뮤니티</Link>
            </div>
            <div className='UserInfoheadermenu3'>
            <Text1
                  color="black"
                  onClick={() => {
                    dispatch(actionCreators.logoutDB());
                  }}
                >
                  로그아웃 
                </Text1>
                <Text1
                onClick={() => {
                  navigate("/changeUserInfo");
                }}
                color="purple"
              >{username}님
              </Text1>
            </div>
            </div>
            </div>
            </div>
            </div>
            <Link to="/AcmList"></Link>
            <div className="mypagecontainer">
        <div className="mypagetit">
        <Link to="/Mypage">MY PAGE</Link>
        </div>
        <div className="mypagebox">
          <div className="mypageboxtext">{username} 님</div>
          {/* <div className="mypageboxtext1">포인트</div> */}
          {/* <div className="mypageboxtext2">0P</div> */}
          <div className="mypageboxtext3">개인 정보 관리</div>
          <div className="mypageboxtext4"><Link to="/ChangeUserInfo">회원 정보 수정</Link></div>
          <div className="mypageboxtext5"><Link to="/Withdraw">회원 탈퇴</Link></div>
          {/* <div className="mypageboxtext3">관심 리스트</div>
          <div className="mypageboxtext4">숙소 리스트</div> */}
          {/* <div className="mypageboxtext5">스크랩</div>
          <div className="mypageboxtext3">개인 정보 관리</div>
          <div className="mypageboxtext4"><Link to="/ChangeUserInfo">회원 정보 수정</Link></div>
          <div className="mypageboxtext5">비밀 번호 변경</div>
          <div className="mypageboxtext5">회원 탈퇴</div> */}
        </div>
        <div className="UserInfo1">회원 정보 수정
        <div className="UserInfo2">MY INFORMATION
        </div>
        <div className="UserInfo3">김하이</div>
        <div className="UserInfo4">2000.01.01</div>
        {/* <div className="UserInfo5">ENGLISH NAME *
        <div className="UserInfo6">
        <input onChange={(e)=> {입력값변경(e.target.value);
              console.log(입력값);}}></input>
              </div><div className="UserInfo7">NICKNAME *</div>
              <div className="UserInfo6">
        <input onChange={(e)=> {입력값변경(e.target.value);
              console.log(입력값);}}></input><div className="UserInfo8"><button type='button' onClick={()=>{
                
            }}>중복 확인</button></div>
            <div className="UserInfo7">NATIONALITY *</div>
            <div className="UserInfo6">
        <input onChange={(e)=> {입력값변경(e.target.value);
              console.log(입력값);}}></input>
              </div>
              <div className="UserInfo7">PHONE NUMBER *</div>
              <div className="UserInfo6">
        <input onChange={(e)=> {입력값변경(e.target.value);
              console.log(입력값);}}></input>
              </div>
              <div className="UserInfo7">ADDRESS *</div>
              <div className="UserInfo6">
        <input onChange={(e)=> {입력값변경(e.target.value);
              console.log(입력값);}}></input>
              </div>
              <div className="UserInfo7">E-MAIL *</div>
              <div className="UserInfo6">
        <input onChange={(e)=> {입력값변경(e.target.value);
              console.log(입력값);}}></input><div className="UserInfo8"><button type='button' onClick={()=>{
                
            }}>중복 확인</button></div>
              </div>
              <div className="UserInfo9">저장</div>
              </div>
            </div> */}
            <SignupTable>
        {/* <tbody> */}
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
           <tr>
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
      </SignupTable>
      <Button width="240px" borderColor="3px solid #668FA1" bg="#668FA1" margin="123px 0px 305px 123px;" _onClick={() => update()}>
        저장
      </Button>
        </div>
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
)

}
return(
  <div className="ChangeUserInfo">
    <div className='UserInfoheadercontainer'>
    <div className="UserInfocontainer">
      <div className="UserInfoheader">
        <div className="UserInfoheaderlogo">
        <Link to="/">하이</Link>
          <div className='UserInfoheadermenu1'>
          <Link to="/AcmList">숙소</Link>
          </div>
          <div className='UserInfoheadermenu2'>
          <Link to="/Join">커뮤니티</Link>
          </div>
          <div className='UserInfoheadermenu3'>
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
   <div className="mypagecontainer">
        <div className="mypagetit">
        <Link to="/Mypage">MY PAGE</Link>
        </div>
        <div className="mypagebox">
          <div className="mypageboxtext">{username} 님</div>
          {/* <div className="mypageboxtext1">포인트</div> */}
          {/* <div className="mypageboxtext2">0P</div> */}
          <div className="mypageboxtext3">개인 정보 관리</div>
          <div className="mypageboxtext4"><Link to="/ChangeUserInfo">회원 정보 수정</Link></div>
          <div className="mypageboxtext5"><Link to="/Withdraw">회원 탈퇴</Link></div>
          {/* <div className="mypageboxtext3">관심 리스트</div>
          <div className="mypageboxtext4">숙소 리스트</div> */}
          {/* <div className="mypageboxtext5">스크랩</div>
          <div className="mypageboxtext3">개인 정보 관리</div>
          <div className="mypageboxtext4"><Link to="/ChangeUserInfo">회원 정보 수정</Link></div>
          <div className="mypageboxtext5">비밀 번호 변경</div>
          <div className="mypageboxtext5">회원 탈퇴</div> */}
        </div>
        <div className="UserInfo1">회원 정보 수정
        <div className="UserInfo2">MY INFORMATION
        </div>
        <div className="UserInfo3">김하이</div>
        <div className="UserInfo4">2000.01.01</div>
        {/* <div className="UserInfo5">ENGLISH NAME *
        <div className="UserInfo6">
        <input onChange={(e)=> {입력값변경(e.target.value);
              console.log(입력값);}}></input>
              </div><div className="UserInfo7">NICKNAME *</div>
              <div className="UserInfo6">
        <input onChange={(e)=> {입력값변경(e.target.value);
              console.log(입력값);}}></input><div className="UserInfo8"><button type='button' onClick={()=>{
                
            }}>중복 확인</button></div>
            <div className="UserInfo7">NATIONALITY *</div>
            <div className="UserInfo6">
        <input onChange={(e)=> {입력값변경(e.target.value);
              console.log(입력값);}}></input>
              </div>
              <div className="UserInfo7">PHONE NUMBER *</div>
              <div className="UserInfo6">
        <input onChange={(e)=> {입력값변경(e.target.value);
              console.log(입력값);}}></input>
              </div>
              <div className="UserInfo7">ADDRESS *</div>
              <div className="UserInfo6">
        <input onChange={(e)=> {입력값변경(e.target.value);
              console.log(입력값);}}></input>
              </div>
              <div className="UserInfo7">E-MAIL *</div>
              <div className="UserInfo6">
        <input onChange={(e)=> {입력값변경(e.target.value);
              console.log(입력값);}}></input><div className="UserInfo8"><button type='button' onClick={()=>{
                
            }}>중복 확인</button></div>
              </div>
              <div className="UserInfo9">저장</div>
              </div>
            </div> */}
            <SignupTable>
        {/* <tbody> */}
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
           <tr>
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
      </SignupTable>
      <Button width="240px" borderColor="3px solid #668FA1" bg="#668FA1" margin="123px 0px 305px 123px;" _onClick={() => update()}>
        저장
      </Button>
        </div>
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
)

}

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

const CheckSpan = styled.span`
  color: #535353;
  font-family:'Gowun Dodum';
  font-size:25px;
`;

export default ChangeUserInfo;