import "./Payment.css";
import { Link } from 'react-router-dom'
import Text1 from "../pages/elements/Text1";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { actionCreators as userActions } from "../pages/redux/modules/user";
import { actionCreators } from "../pages/redux/modules/user";
import { getCookie, setCookie } from "../pages/shared/Cookie";

function Payment(){

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const is_login = getCookie("is_login");
  const is_token = getCookie("Authorization");

  if (is_login && is_token) {
    const username = getCookie("username");
return(
    <div className="Payment">
      <div className='acmlistheadercontainer'>
      <div className="acmlistcontainer">
        <div className="acmlistheader">
          <div className="acmlistheaderlogo">
          <Link to="/">하이</Link>
            <div className='acmlistheadermenu1'>
            <Link to="/AcmList">숙소</Link>
            </div>
            <div className='acmlistheadermenu2'>
            <Link to="/Join">커뮤니티</Link>
            </div>
            <div className='acmlistheadermenu3'>
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
        <div className="paymentcontainer">
    <div className="paymenttitle">예약이 완료되었습니다</div>
    </div>
    <div className="paymentbox">
      <div className="paymentcontainer">
      <div className="paymentboxtext1">예약 코드</div>
      <div className="paymentboxtext2">숙소</div>
      <div className="paymentboxtext5">객실</div>
      <div className="paymentboxtext5">날짜</div>
      <div className="paymentboxtext3">235436</div>
      <div className="paymentboxtext4">하이파리 민박</div>
      <div className="paymentboxtext4">2인실</div>
      <div className="paymentboxtext4">2022.05.15 일</div>
    </div>
    </div>
    <div className="paymentcontainer">
    <div className="paymentlinebox1">
        <div className="paymentlinebox2">
          <div className="paymentlinetext1">체크인<div className="paymentlinetext2">2022.11.17</div></div>
          <div className="paymentboxtext3">체크아웃<div className="paymentlinetext3">2022.11.17</div></div>
          <div className="paymentlinetext4">총 예약금액</div>
          <div className="paymentlinetext5">74,900원</div>
        </div>
        <div className="paymentlinebox3">
        <div className="paymentlinetext6">예약 내역 상세 확인</div>
        <div className="paymentlinetext7">예약 내역 바로가기</div>
        </div>
    </div>
    <div className="paymentlinetext8">문의 사항</div>
    <div className="paymentlinebox4"></div>
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
  <div className="Payment">
    <div className='acmlistheadercontainer'>
    <div className="acmlistcontainer">
      <div className="acmlistheader">
        <div className="acmlistheaderlogo">
        <Link to="/">하이</Link>
          <div className='acmlistheadermenu1'>
          <Link to="/AcmList">숙소</Link>
          </div>
          <div className='acmlistheadermenu2'>
          <Link to="/Join">커뮤니티</Link>
          </div>
          <div className='acmlistheadermenu3'>
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
          <div className='acmlistheadermenu4'>
          </div>
          </div>
          </div>
          </div>
          </div>
          <Link to="/AcmList"></Link>
      <div className="paymentcontainer">
  <div className="paymenttitle">예약이 완료되었습니다</div>
  </div>
  <div className="paymentbox">
    <div className="paymentcontainer">
    <div className="paymentboxtext1">예약 코드</div>
    <div className="paymentboxtext2">숙소</div>
    <div className="paymentboxtext5">객실</div>
    <div className="paymentboxtext5">날짜</div>
    <div className="paymentboxtext3">235436</div>
    <div className="paymentboxtext4">하이파리 민박</div>
    <div className="paymentboxtext4">2인실</div>
    <div className="paymentboxtext4">2022.05.15 일</div>
  </div>
  </div>
  <div className="paymentcontainer">
  <div className="paymentlinebox1">
      <div className="paymentlinebox2">
        <div className="paymentlinetext1">2022.05.15</div>
        <div className="paymentboxtext3">235436</div>
      </div>
      <div className="paymentlinebox3"></div>
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

export default Payment;