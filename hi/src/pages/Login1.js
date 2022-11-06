import "./Login.css";
import { Routes, Route, Link } from 'react-router-dom'
function Login(){
   
    

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
            <Link to="/Login">LOGIN</Link>
            </div>
            <div className='loginheadermenu4'>
            <Link to="/Signup">JOIN</Link>
            </div>
            </div>
            </div>
            </div>
            </div>
            <Link to="/AcmList"></Link>
   <div className="Logincontainer">
   <div className="Logintitle">
   SIGN IN
   </div>
   <div className="loginid">
   <input placeholder="아이디" onChange={()=> {}}></input>
   </div>
   <div className="loginpw">
   <input type="password" placeholder="비밀번호" onChange={()=> {}}></input>
   </div>
   <div className="loginbutton">로그인</div>
   <div className="loginjoin">회원가입</div>
   <div className="loginfind">아이디/비밀번호 찾기</div>
   <div className="logingap"></div>
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


export default Login;