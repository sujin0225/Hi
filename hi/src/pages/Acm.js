import lodging from '../img/숙소.png'
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect , useState } from 'react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import "./Acm.css";
import lodgingphoto1 from '../img/숙소메인.png'
import lodgingphoto2 from '../img/숙소1.png'
import axios from "axios";
import { Routes, Route, Link, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom';



function Acm(){
    let [tab, setTab] = useState(0)
    let [checkin, setcheckin] = useState(['2022.05.07 토 - 2022.05.08 일']);
    let [room, setroom] = useState(['여성 도미토리', '남성 도미토리', '2-3인실', '2인 더블 침실', '2인실']);
    let [room1, setroom1] = useState(['여성 도미토리', '남성 도미토리', '개인실']);
    let [check, setcheck] = useState(['최소 예약 2박 이상'])
    let [people, setpeople] = useState(['객실 정원 1~2명', '객실 정원 2~3명', '객실 정원 1~4명'])
    let [reservation, setreservation] = useState(['예약 가능', '예약 불가']);
    let [peoplecheck, setpeoplecheck] = useState(['1인1박','2인1박']);
    let [roomprice, setroomprice] = useState(['82,200원', '123,500원']);
    const [acm, setAcm] = useState([]);
    const { id } = useParams();
    const[position, setPosition] = useState(0);
    const { pathname } = useLocation();
    const [data, setData] = useState([]);
    const [roomdata, setRoomData] = useState([]);
    const [products, setProduct] = useState({});
    const [content, setContent] = useState({});
    const location = useLocation();
    console.log(location);

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

    useEffect(() => {
      window.scrollTo(0,0);
  }, [pathname]);

  

useEffect(() => {
  axios.get(`/accommodation/${id}`)
  .then(res => setData(res.data))
},[]);

useEffect(() => {
  axios.get(`/accommodation/${id}`)
  .then(res => setRoomData(res.data.rooms))
},[]);


return(
    <div className="Acm">
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
            <Link to="/Login">LOGIN</Link>
            </div>
            <div className='acmlistheadermenu4'>
            <Link to="/Signup">JOIN</Link>
            </div>
            </div>
            </div>
            </div>
            </div>
            <Link to="/AcmList"></Link>
        <div className="container">
            <div className="lodgingtit">{data.nameKor}</div>
            <div className="lodgingprice"><div className='lodbox'></div></div>
         </div>
         <>
      <Swiper
        spaceBetween={30}
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
        <SwiperSlide><img src = {(data.imageUrls ?? [])[0]} width='100%' height='700'/></SwiperSlide>
        <SwiperSlide><img src = {(data.imageUrls ?? [])[1]} width='100%' height='700'/></SwiperSlide>
        <SwiperSlide><img src = {(data.imageUrls ?? [])[2]} width='100%' height='700'/></SwiperSlide>
        <SwiperSlide><img src = {(data.imageUrls ?? [])[3]} width='100%' height='700'/></SwiperSlide>
        <SwiperSlide><img src = {(data.imageUrls ?? [])[4]} width='100%' height='700'/></SwiperSlide>
        <SwiperSlide><img src = {(data.imageUrls ?? [])[5]} width='100%' height='700'/></SwiperSlide>
        <SwiperSlide><img src = {(data.imageUrls ?? [])[6]} width='100%' height='700'/></SwiperSlide>
      </Swiper>

    </>
    <div className="container01">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          객실 예약
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          숙소 소개
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          숙소 상세 정보
        </button>
        <button
          className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(4)}
        >
          위치
        </button>
        <button
          className={toggleState === 5 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(5)}
        >
          리뷰
        </button>
      </div>

      <div className="content-tabs">
        <div className={toggleState === 1 ? "content  active-content" : "content"}>
         CHECK IN / OUT
         
         <div className='text'>{checkin}</div>
         {/* <Link to={`/Room/${data.rooms &&(data.rooms??[])[0].id}`}>
         <img src = {data.rooms &&(data.rooms??[])[0].imageUrl} />
         <div className='textbox'>
         <div className='text1'>{data.rooms &&(data.rooms??[])[0].name}</div>
         <div className='text3'>{data.rooms &&(data.rooms??[])[0].type}</div>
         <div className='text4'>{data.rooms &&(data.rooms??[])[0].numberPeople}명</div>
         <div className='text7'>{data.rooms &&(data.rooms??[])[0].price}원</div>
        </div>
        </Link> */}
        {roomdata.map((item,i) => {
        return (
          <div className='Acm'>
          <Link to={`/Room/${item.id}`}>
          <div className='text0'><img src = {item.imageUrl } width='529' height='353'/></div>
          <div className='textbox'>
            
          <div className='text1'>{item.name}</div>
          <div className='text3'>{item.type}</div>
          <div className='text4'>{item.numberPeople}명</div>
          <div className='text7'>{item.price}원</div>
          </div>
          </Link>
         </div>
        )
      })}
        <div className='textbox'></div>
        </div>
        
        <div className={toggleState === 2 ? "content  active-content" : "content"}>
            숙소 소개
            <div className='lodgingtext1'>
              {data.introduction}
            </div>
          <div className='textbox'></div>
        </div>

        <div className={toggleState === 3 ? "content  active-content" : "content"}>
          <div className='servicetext1'> 부가시설 및 서비스</div>
            <div className='servicebox'>
            <div className='servicebox1'>
              <div className='servicetext2'>
              <div className='servicetext3'>
              {data.filtering}
              </div>
              </div>
              </div>
            
          
          </div>
          
          <div className='servicetext4'>
          
          </div>
          
          <div className='servicetext3'>
       
        </div>
      <div className='servicetext4'>
      
    </div>          
      <div className='textbox'></div>
        </div>
        <div className={toggleState === 4 ? "content  active-content" : "content"}>
          {data.directions}
          <div className='textbox'></div>
        </div>
        <div className={toggleState === 5 ? "content  active-content" : "content" }>
            
          <div className='textbox'></div>
        </div>
      </div>
      {/* <TabContent tab={tab}/> */}
    </div>
    {/* <div className="container">
        <div className='tab' onClick={()=>{ setTab(0) }}>객실 예약</div>
        <div className='tab' onClick={()=>{ setTab(1) }}>숙소 소개</div>
        <div className='tab' onClick={()=>{ setTab(2) }}>숙소 상세 정보</div>
        <div className='tab' onClick={()=>{ setTab(3) }}>위치</div>
        <div className='tab' onClick={()=>{ setTab(4) }}>리뷰</div>
        <TabContent tab={tab}/>
    </div> */}
   

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


// function TabContent({tab}){

//     let [fade, setFade] = useState('')

//     useEffect(()=>{
//         setTimeout(()=>{ setFade('end') }, 100)
//         return ()=>{
//             setFade('')
//         }
//     }, [tab])


//     return (
//     <div className={'start ' + fade}>
//         {[ <div>내용0</div>, <div>내용1</div>, <div>내용2</div>, <div>내용3</div>, <div>내용4</div>][tab]}
//     </div>
//     )
// }



export default Acm;