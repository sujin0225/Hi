import React from "react";
import styled from "styled-components";
import { Text, LoginBox } from "../pages/elements/element";
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../pages/redux/modules/user";
import { useNavigate } from "react-router-dom";
import { actionCreators } from "../pages/redux/modules/user";
import Text1 from "../pages/elements/Text1";
import { getCookie } from "../pages/shared/Cookie";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  // useState를 이용하여 아이디와 비밀번호의 값을 redux로 보내줄 준비

  const loginId = (e) => {
    setUsername(e);
  };

  const loginPw = (e) => {
    setPassword(e);
  };

  const login = () => {
    if (username === "" || password === "") {
      window.alert("아이디와 비밀번호를 입력해주세요.");
      // 아이디와 비밀번호를 입력하지 않을 경우 alert 띄움
      return;
    } else {
      dispatch(actionCreators.loginDB(username, password));
    }
    // redux의 loginDB에 id, pwd를 보내줌
  };

const is_login = getCookie("is_login");
const is_token = getCookie("Authorization");

if (is_login && is_token) {
  const username = getCookie("username");
  return (
    <div className="Login">
      <div className='loginheadercontainer'>
      <div className="logincontainer">
        <div className="loginheader">
          <div className="loginheaderlogo">
          <Link to="/">하이</Link>
            <div className='loginheadermenu1'>
            <Link to="/AcmList">숙소</Link>
            </div>
            <div className='loginheadermenu2'>
            <Link to="/Join">커뮤니티</Link>
            </div>
            <div className='loginheadermenu3'>
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
   <div className="Logincontainer">
    <React.Fragment>
      <LoginWrap>
      <div className="Logintitle">
   SIGN IN
   </div>
        {/* <Text
          bold
          margin="70px auto 34px"
          size="22px"
          width="100%"
          center="center"
        >
          로그인
        </Text> */}
<div className="loginid">
        <LoginBox
          value={username}
          placeholder="아이디"
          _onChange={(e) => {
            loginId(e.target.value);
          }}
        />
</div>
<div className="loginpw">
        <LoginBox
          value={password}
          type="password"
          placeholder="비밀번호"
          _onChange={(e) => {
            loginPw(e.target.value);
          }}
        />
        <div
          style={{
            width: "27%",
            margin: "10px auto",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          </div>
          {/* <CheckWrap>
            <Check type="checkbox" />
            <div
              style={{
                color: "#4f4f4f",
                size: "13px",
                margin: "0 0 0px 6px",
                fontSize: "14px",
                display: "contents",
              }}
            >
              {" "}
              보안접속
            </div>
          </CheckWrap> */}
{/* <div className="loginfind">
          <FindStyle>
            <div
              style={{
                color: "#4f4f4f",
                size: "13px",
                margin: "0",
                fontSize: "13px",
                paddingTop: "3px",
              }}
            >
              아이디 찾기 | 비밀번호 찾기
            </div>
            <div
              style={{
                color: "#4f4f4f",
                fontSize: "13px",
                margin: "0 0 0 4px",
              }}
            ></div>
          </FindStyle>
          </div> */}
        </div>
        <ButtonLogin
          onClick={() => {
            login();
          }}
        >
          <Text color="#FEFEFE" size="20px" margin="1px 0 0 0" >
            로그인
          </Text>
        </ButtonLogin>
        {/* <div className="loginjoin"> */}
        <ButtonSignup
          onClick={() => {
            navigate("/signup");
          }}
        >
          <Text color="#535353" size="20px" >
            회원가입
          </Text>
        </ButtonSignup>
        {/* </div> */}
      </LoginWrap>
    </React.Fragment>
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

return(
  <div className="Login">
      <div className='loginheadercontainer'>
      <div className="logincontainer">
        <div className="loginheader">
          <div className="loginheaderlogo">
          <Link to="/">하이</Link>
            <div className='loginheadermenu1'>
            <Link to="/AcmList">숙소</Link>
            </div>
            <div className='loginheadermenu2'>
            <Link to="/Join">커뮤니티</Link>
            </div>
            <div className='loginheadermenu3'>
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
   <div className="Logincontainer">
    <React.Fragment>
      <LoginWrap>
      <div className="Logintitle">
   SIGN IN
   </div>
        {/* <Text
          bold
          margin="70px auto 34px"
          size="22px"
          width="100%"
          center="center"
        >
          로그인
        </Text> */}
<div className="loginid">
        <LoginBox
          value={username}
          placeholder="아이디"
          _onChange={(e) => {
            loginId(e.target.value);
          }}
        />
</div>
<div className="loginpw">
        <LoginBox
          value={password}
          type="password"
          placeholder="비밀번호"
          _onChange={(e) => {
            loginPw(e.target.value);
          }}
        />
        <div
          style={{
            width: "27%",
            margin: "10px auto",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          </div>
          {/* <CheckWrap>
            <Check type="checkbox" />
            <div
              style={{
                color: "#4f4f4f",
                size: "13px",
                margin: "0 0 0px 6px",
                fontSize: "14px",
                display: "contents",
              }}
            >
              {" "}
              보안접속
            </div>
          </CheckWrap> */}
{/* <div className="loginfind">
          <FindStyle>
            <div
              style={{
                color: "#4f4f4f",
                size: "13px",
                margin: "0",
                fontSize: "13px",
                paddingTop: "3px",
              }}
            >
              아이디 찾기 | 비밀번호 찾기
            </div>
            <div
              style={{
                color: "#4f4f4f",
                fontSize: "13px",
                margin: "0 0 0 4px",
              }}
            ></div>
          </FindStyle>
          </div> */}
        </div>
        <ButtonLogin
          onClick={() => {
            login();
          }}
        >
          <Text color="#FEFEFE" size="20px" margin="1px 0 0 0" >
            로그인
          </Text>
        </ButtonLogin>
        {/* <div className="loginjoin"> */}
        <ButtonSignup
          onClick={() => {
            navigate("/signup");
          }}
        >
          <Text color="#535353" size="20px" >
            회원가입
          </Text>
        </ButtonSignup>
        {/* </div> */}
      </LoginWrap>
    </React.Fragment>
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
}
const LoginWrap = styled.div`
  margin: 0px auto 100px 0px;
  justify-content: center;
  text-align: center;
`;

const CheckWrap = styled.div``;

const Check = styled.input`
  width: 10px;
  height: 12px;
  border-radius: 3px;
  border: 1px solid #8c8c8c;
  background-size: 16px 17px;
  color: #8c8c8c;
`;

const FindStyle = styled.ul`
  display: contents;
  /* display: flex;
  justify-content: end;
  margin-right: 463px;
  margin-top: -20px;
  margin-bottom: 30px; */
`;

const ButtonLogin = styled.button`
  // margin: 10px auto;
  // width: 27%;
  // height: 54px;
  // border-radius: 3px;
  // border: 1px solid #5f0081;
  // background-color: #5f0080;
  // cursor: pointer;
  // display: block;
  // overflow: hidden;
  // text-align: center;
  width: 625px;
  height: 63px;
  float: left;
  background-color: #668FA1;
  clear: both;
  margin-top: 30px;
  font-family: 'Noto Sans KR';
  font-size: 20px;
  font-weight: 400;
  color:#FEFEFE;
  // padding-top: 17px;
  border:none;
  cursor: pointer;
`;

const ButtonSignup = styled.button`
  margin-top:30px;
  // width: 27%;
  height: 54px;
  border-radius: 3px;
  // border: 1px solid #5f0081;
  background-color: #ffffff;
  cursor: pointer;
  display: block;
  overflow: hidden;
  text-align: center;
  float:left;
  clear:both;
  font-family:'Noto Sans KR';
  font-weight:400;
  font-size:20px;
  margin-bottom:304px;
`;

export default Login;
