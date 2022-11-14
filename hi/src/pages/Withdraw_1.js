import "./Withdraw_1.css";
import { Link } from 'react-router-dom'
import Text1 from "../pages/elements/Text1";
import { actionCreators } from "../pages/redux/modules/user";
import { getCookie } from "../pages/shared/Cookie";
import styled from "styled-components";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../pages/elements/element";
import Swal from "sweetalert2";
import { actionCreators as userActions } from "../pages/redux/modules/user";

function Withdraw_1({ user }) {
  // const Withdraw_1 = (props) => {
    const is_login = getCookie("is_login");
    const is_token = getCookie("Authorization");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const { username, password } = props;
    const username = getCookie("username");
    console.log(username);
    // const password = user?.password;

    const deleteBtn = () => {
      dispatch(userActions.deleteUserDB(username));
      console.log(userActions.deleteUserDB(username));
    }

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
                  _onClick={() => {
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
          <div className="mypageboxtext3">개인 정보 관리</div>
          <div className="mypageboxtext4"><Link to="/ChangeUserInfo">회원 정보 수정</Link></div>
          <div className="mypageboxtext5"><Link to="/Withdraw">회원 탈퇴</Link></div>
        </div>
        <div className="withdraw1text1">회원 탈퇴
        <div className="withdraw1text2">탈퇴를 신청하시기 전에 아래의 유의사항을 한 번 더 확인해 주시기 바랍니다.
        </div>
        <div className="withdraw1box1">
        <div className="withdraw1text6">탈퇴를 신청하시면 번복이 불가능합니다.</div>
        <div className="withdraw1text7">탈퇴 신청이 완료되면 즉시 홈페이지 로그인이 제한됩니다.</div>
        </div>
        <div className="withdrawtext5">
        <Button
                bg = "#FFFFFF"
                text="탈퇴하기"
                color = "#535353"
                borderColor="3px solid #DCDCDC"
                _onClick={deleteBtn}
                />  
        </div>        
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
          <div className="mypageboxtext3">개인 정보 관리</div>
          <div className="mypageboxtext4"><Link to="/ChangeUserInfo">회원 정보 수정</Link></div>
          <div className="mypageboxtext5"><Link to="/Withdraw">회원 탈퇴</Link></div>
        </div>
        <div className="UserInfo1">회원 정보 수정
        <div className="UserInfo2">MY INFORMATION
        </div>
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

export default Withdraw_1;