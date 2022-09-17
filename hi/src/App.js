import logo from './logo.svg';
import './App.css';
import './pages/AcmList.css';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./styles.css";
import { Routes, Route, Link } from 'react-router-dom'
import AcmList from './pages/AcmList';
import Join from './pages/Join';
import Search from './pages/ProductSearch';
import Acm from './pages/Acm';
import JoinBoard from './pages/JoinBoard';
import Room from './pages/Room';
import Mypage from './pages/Mypage';
import Reser from './pages/Reser';
import Payment from './pages/Payment';
import ChangeUserInfo from './pages/ChangeUserInfo';
import bg1 from './img/그림1.png'
import bg2 from './img/그림4.png'
import travel1 from './img/여행지1.png'
import travel2 from './img/여행지2.png'
import travel3 from './img/여행지3.png'
import travel4 from './img/여행지4.png'
import travel5 from './img/여행지5.png'
import travel6 from './img/여행지6.png'
import travel7 from './img/여행지7.png'
import travel8 from './img/여행지8.png'
import travel9 from './img/여행지9.png'
import add from './img/그림7.png'


function App() {

let [글제목, b] = useState(['파리 여행하시는 분 계신가요?', '같이 맛있는거 드실 분!']);
let [글내용, a] = useState(['파리에 2주정도 있을 예정입니다...', '여행기간 중 점심하실수 있으신분 구해요!!...']);
let [기간, c] = useState(['동행 기간 2022 - 05 - 05 ~ 2022 - 05 - 19', '동행 기간 2022 - 05 - 10 ~ 2022 - 05 - 11']);
const [products, setProducts] = useState([]);
  const [입력값, 입력값변경] = useState("");
  // const convertPrice = (price) => {
  //   return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  // }

  const onSubmit = async () => {
    window.location.href = "/search/" + 입력값;
  };
  
  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <div className="headerlogo">
          <Link to="/">하이</Link>
            <div className='headermenu1'>
            <Link to="/AcmList">숙소</Link>
            </div>
            <div className='headermenu2'>
            <Link to="/Join">커뮤니티</Link>
            </div>
            <div className='headermenu3'>
            <a href='#1'>LOGIN</a>
            </div>
            <div className='headermenu4'>
            <a href='#1'>JOIN</a>
            </div>
            </div>
            </div>
            </div>
            <Link to="/AcmList"></Link>
            <Routes>
            <Route path="/" element={
              <>
              <div className='main'>
              <div className='main1'>
            <div className='main2'>한인민박은 하이</div>              
            <div className='mainsearch1'>
              <input placeholder="도시명, 숙소명" onChange={(e)=> {입력값변경(e.target.value);
              console.log(입력값);}}></input>
              </div>
              <div className='maindata1'>
              <input type="date"data-placeholder="CHECK IN" required aria-required="ture" onChange={(e)=> { 입력값변경(e.target.value);
              console.log(입력값);}}></input>
              </div>
              <div className='maindata2'>
              <input type="date"data-placeholder="CHECK OUT" required aria-required="ture" onChange={(e)=> { 입력값변경(e.target.value);
              console.log(입력값);}}></input>
              </div>
              <div className='mainsearch2'>
              <img src = {bg1} width='39' height='39'/>
            </div> 
            <div className='mainsearch3'>내주변</div>
            <div className='mainsearch4'>
            <button type='button' onClick={()=>{
                onSubmit();
            }}>SEARCH</button></div>
            </div>
            </div>
            <div className="container">
              <div className='content1'>인기 여행지
              <div className='content2'>
              <Link to="/AcmList">MORE</Link></div>
                <div className='content3'>
                <Link to="/AcmList"><img src = {bg2} width='68' height='68'  ></img></Link>
                </div>
                </div>
      <Swiper
        slidesPerView={4}
        spaceBetween={9}
        //pagination={{
        //  clickable: true,
        //}}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          "@1.50": {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}

        className="mySwiper"
      >
        <SwiperSlide><Link to="/AcmList"><img src = {travel1} /></Link></SwiperSlide>
        <SwiperSlide><Link to="/AcmList"><img src = {travel2} /></Link></SwiperSlide>
        <SwiperSlide><Link to="/AcmList"><img src = {travel3} /></Link></SwiperSlide>
        <SwiperSlide><Link to="/AcmList"><img src = {travel4} /></Link></SwiperSlide>
        <SwiperSlide><Link to="/AcmList"><img src = {travel5} /></Link></SwiperSlide>
        <SwiperSlide><Link to="/AcmList"><img src = {travel6} /></Link></SwiperSlide>
        <SwiperSlide><Link to="/AcmList"><img src = {travel7} /></Link></SwiperSlide>
        <SwiperSlide><Link to="/AcmList"><img src = {travel8} /></Link></SwiperSlide>
        <SwiperSlide><Link to="/AcmList"><img src = {travel9} /></Link></SwiperSlide>
      </Swiper>
        
      <div className='content1'>커뮤니티 
        <div className='content4'>
        <Link to="/Join">MORE</Link></div>
            <div className='content3'>
            <Link to="/Join"><img src = {bg2} width='68' height='68'>
                  </img>
                </Link>
              </div>
            </div>
            <div className='box1'>
            <Link to="/JoinBoard">
              <div className='boxtitle'>{글제목[0]}</div>
               <div className='boxcontent1'>{글내용[0]}</div> 
               <div className='boxcontent2'>{기간[0]}</div>
               <div className='texticon'><img src = {add} width='55' height='55'/></div>
               </Link>
               </div>
            <div className='box2'>
            <Link to="/JoinBoard">
              <div className='boxtitle'>{글제목[1]}</div>
              <div className='boxcontent1'>{글내용[1]}</div> 
              <div className='boxcontent2'>{기간[1]}</div>
              <div className='texticon'><img src = {add} width='55' height='55'/></div>
              </Link>
              </div>
            <div className='interval'></div>
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
        <div>
        </div>
        </>
            }/>
        <Route path="/AcmList" element={<AcmList products={products} setProducts={setProducts}/> }/>
        <Route path="/Join" element={<Join/> }/>
        <Route path="/Acm/:id" element={<Acm/>}/>
        <Route path="/JoinBoard" element={<JoinBoard/>}/>
        <Route path="/search/:입력값" element={<Search/>} />
        <Route path="/Room/:id" element={<Room/>}/>
        <Route path="/Mypage" element={<Mypage/> }/>
        <Route path="/Reser/:id" element={<Reser/> }/>
        <Route path="/ChangeUserInfo" element={<ChangeUserInfo/> }/>
        <Route path="/Payment/:id" element={<Payment/> }/>
      </Routes>
    </div>
  );
}

export default App;
