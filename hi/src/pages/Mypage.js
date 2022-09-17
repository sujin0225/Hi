import "./Mypage.css";
import { Routes, Route, Link } from 'react-router-dom'
function Mypage(){
   
    

return(
    <div className="Mypage">
    <div className="mypagecontainer">
        <div className="mypagetit">
        <Link to="/Mypage">MY PAGE</Link>
        </div>
        <div className="mypagebox">
          <div className="mypageboxtext">김하이님</div>
          <div className="mypageboxtext1">포인트</div>
          <div className="mypageboxtext2">0P</div>
          <div className="mypageboxtext3">예약 확인</div>
          <div className="mypageboxtext4">숙소 예약 내역</div>
          <div className="mypageboxtext5">숙소 환불 내역</div>
          <div className="mypageboxtext3">관심 리스트</div>
          <div className="mypageboxtext4">숙소 리스트</div>
          <div className="mypageboxtext5">스크랩</div>
          <div className="mypageboxtext3">개인 정보 관리</div>
          <div className="mypageboxtext4"><Link to="/ChangeUserInfo">회원 정보 수정</Link></div>
          <div className="mypageboxtext5">비밀 번호 변경</div>
          <div className="mypageboxtext5">회원 탈퇴</div>
        </div>
        <div className="mypagebox1"></div>
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


export default Mypage;