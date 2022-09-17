import roomphoto from '../img/객실.png'
import { Swiper, SwiperSlide } from "swiper/react"
import "./Room.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import { useEffect , useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom'

function Room(){
   
    const[position, setPosition] = useState(0);

    function onScroll(){
      setPosition(window.scrollY)
    }
    useEffect(()=> {
      window.addEventListener('scroll', onScroll);
      return ()=> {
        window.removeEventListener("scroll", onScroll);
      };
    }, []);

    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
      setToggleState(index);
    };



return(
    <div className="Acm">
      <div className='roomcontainer'>
        <div className='roommain'>
        하이파리 민박
        </div>
        <div className='roommain1'>2인실</div>
        </div>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img src = {roomphoto} width='100%' height='600'/></SwiperSlide>
        <SwiperSlide><img src = {roomphoto} width='100%' height='600'/></SwiperSlide>
        <SwiperSlide><img src = {roomphoto} width='100%' height='600'/></SwiperSlide>
        <SwiperSlide><img src = {roomphoto} width='100%' height='600'/></SwiperSlide>
        <SwiperSlide><img src = {roomphoto} width='100%' height='600'/></SwiperSlide>
        <SwiperSlide><img src = {roomphoto} width='100%' height='600'/></SwiperSlide>
        <SwiperSlide><img src = {roomphoto} width='100%' height='600'/></SwiperSlide>
        <SwiperSlide><img src = {roomphoto} width='100%' height='600'/></SwiperSlide>
        <SwiperSlide><img src = {roomphoto} width='100%' height='600'/></SwiperSlide>
      </Swiper>
      <div className='roomcontainer'>
        <div className='roominfo'>
        Room Info
        <div className='roominfo2'>
            54,900원~
        </div>
        </div>
        <div className='roominfo1'>
          인원
          </div>
          <div className='roominfo3'>
            기준 2명 / 최대 3명
          </div>
          <div className='roominfo4'>
            인원 추가
          </div>
          <div className='roominfo3'>
            가능
          </div>
          <div className='roominfo5'>
            인원 추가 요금
          </div>
          <div className='roominfo6'>
            최대 인원 초과 불가, 추가 인원 현장 결제
          </div>
          <div className='roominfobox'>
            <div className='roomboxtext'>
            체크인 시간은 12시 이후 ~ 24시이며, 체크아웃 시간은 12시 입니다
            </div>
            <div className='roomboxtext1'>체크인, 체크아웃 전후 짐 보관 가능합니다</div>
            <div className='roomboxtext1'>11:00 ~ 14:00 까지는 청소시간이니 협조해 주세요.</div>
            <div className='roomboxtext1'>아파트 내에 위치하므로 밤 늦은 시간에는 소음에 주의해주세요</div>
            <div className='roomboxtext1'>밤 12시 이후 샤워 금지입니다</div>
          </div>
          <div className='roominfo7'>구비시설</div>
          <div className='roomline'></div>
          <div className='roomlinebox1'>
            <div className='roomlinetext'>ROOM</div>
          </div>
          <div className='roomlinebox2'>
            <div className='roomlinetext'>BATH</div>
            </div>
          <div className='roomline'></div>
          <div className='roomlinebox3'>
            <div className='roomlinetext1'>WIFI</div>
            <div className='roomlinetext2'>옷걸이</div>
            <div className='roomlinetext2'>커피포트</div>
            <div className='roomlinetext2'>이불</div>
          </div>
          <div className='roomlinebox4'>
          <div className='roomlinetext1'>화장실</div>
          <div className='roomlinetext2'>비누</div>
          <div className='roomlinetext2'>치약</div>
          <div className='roomlinetext2'>린스</div>
          </div>
          <div className='roomline'></div>
          <div className='roominfo7'>취소환불규정</div>
          <div className='roomtext1'>30일전 취소시 전액 환불(포인트/쿠폰 결제액 제외), 포인트 적립 없음</div>
          <div className='roomtext2'>29일 ~ 15일 전 취소시 90% 환불, 포인트 적립 8%</div>
          <div className='roomtext2'>14일 ~ 7일 전 취소시 80% 환불, 포인트 적립 8%</div>
          <div className='roomtext2'>6일 ~ 1일 전 취소 70% 환불, 포인트 적립 없음</div>
          <div className='roomtext2'>당일취소 및 No-Show 환불불가, 포인트 적립 없음</div>
          <div className='roombutton'><Link to="/Reser/:id">예약하기</Link></div>
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


export default Room;