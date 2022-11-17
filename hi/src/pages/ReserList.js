import "./ReserList.css";
import { Link } from 'react-router-dom'
import Text1 from "./elements/Text1";
import { actionCreators } from "./redux/modules/user";
import { getCookie } from "./shared/Cookie";
import styled from "styled-components";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "./elements/element";
import Swal from "sweetalert2";
import Password from "antd/lib/input/Password";
import axios from "axios";
import { useEffect, useRef, useState, useCallback } from 'react';

function ReserList(){
    const is_login = getCookie("is_login");
    const is_token = getCookie("Authorization");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        const jwtToken = getCookie('Authorization');
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        console.log(jwtToken)
        axios.get(`/reservation/history`)
        .then(res => {setData(res.data)
          console.log(res.data)})
      },[]);
    
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
          <div className="mypageboxtext3">예약 확인</div>
          <div className="mypageboxtext4"><Link to="/ReserList">숙소 예약 내역</Link></div>
          <div className="mypageboxtext3">개인 정보 관리</div>
          <div className="mypageboxtext4"><Link to="/ChangeUserInfo">회원 정보 수정</Link></div>
          <div className="mypageboxtext5"><Link to="/Withdraw">회원 탈퇴</Link></div>
        </div>
        <div className="reserlisttitle">숙소 예약 내역
         <div className="reserlisttitle1">파리 제이민박</div>
         <div className="reserlistbox">
            <div className="reserlistboxtext">체크인</div>
            <div className="reserlistboxtext1">2022.11.17</div>
            <div className="reserlistboxtext">체크아웃</div>
            <div className="reserlistboxtext1">2022.11.17</div>
            <div className="reserlistboxtext2">문의사항</div>
            <div className="reserlistboxtext3">문의사항~~~~문의사항~~~~</div>
            <div className="reserlistboxtext2">2인실</div>
            <div className="paymentlinetext5">74,900원</div>
         </div>
         </div>
       
        {data.map((item,i) => {
        return (
          <div className='Acm'>
          {/* <Link to={`/reser/${item.id}`}> */}
          {/* <div className='text0'><img src = {item.imageUrl } width='529' height='353'/></div> */}
          <div className='textbox'>
            
          <div className='text1'>{item.id}</div>
          {/* <div className='text3'>{item.type}</div>
          <div className='text4'>{item.numberPeople}명</div>
          <div className='text7'>{item.price.toLocaleString()}원</div> */}
          </div>
          {/* </Link> */}
         </div>
        )
      })}
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
          <div className="mypageboxtext3">예약 확인</div>
          <div className="mypageboxtext4"><Link to="/ReserList">숙소 예약 내역</Link></div>
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

export default ReserList;