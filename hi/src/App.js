import logo from './logo.svg';
import './App.css';
import './pages/AcmList.css';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { useLocation } from 'react-router-dom';
import "swiper/css";
import "./styles.css";
import { Routes, Route, Link } from 'react-router-dom'
import AcmList from './pages/AcmList';
import Join from './pages/Join';
import Acm from './pages/Acm';
import JoinBoard from './pages/JoinBoard';
import Room from './pages/Room';
import Mypage from './pages/Mypage';
import Reser from './pages/Reser';
import Payment from './pages/Payment';
import Login from './pages/Login';
import ChangeUserInfo from './pages/ChangeUserInfo';
import JoinBoardWrite from './pages/JoinBoardWrite';
import JoinSearch from './pages/JoinSearch';
import Withdraw from './pages/Withdraw'
import Withdraw_1 from './pages/Withdraw_1'
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
import { Pagination, Navigation } from "swiper";
import Aos from "aos";
import "aos/dist/aos.css";
import Search from './pages/Search';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { stringToQuery, queryToString } from './pages/queryString';
import styled from 'styled-components';
import Calendar from './pages/Calendar';
import CountGuest from './pages/CountGuest';
import RoomLists from './pages/RoomLists';
import AcmListSearch from './pages/AcmListSearch';
import Location from './pages/Location';
import Signup from './pages/Signup';
import { actionCreators as userActions } from "./pages/redux/modules/user";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "./pages/shared/Cookie";
import Text1 from "./pages/elements/Text1";
import { actionCreators } from "./pages/redux/modules/user";

function App() {

let [글제목, b] = useState(['파리 여행하시는 분 계신가요?', '같이 맛있는거 드실 분!']);
let [글내용, a] = useState(['파리에 2주정도 있을 예정입니다...', '여행기간 중 점심하실수 있으신분 구해요!!...']);
let [기간, c] = useState(['동행 기간 2022 - 05 - 05 ~ 2022 - 05 - 19', '동행 기간 2022 - 05 - 10 ~ 2022 - 05 - 11']);
const [products, setProducts] = useState([]);
const [data, setData] = useState([]);
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0,0);
}, [pathname]);


  useEffect(() => {
    Aos.init({duration: 2000});
  }, []);
  const [accomoType, setAccomoType] = useState('');
  const [location, setLocation] = useState();
  const [date, setDate] = useState({ start: null, end: null });
  const [adult, setAdult] = useState(1);
  const [room, setRoom] = useState(1);

  const navigate = useNavigate();

  const goToList = () => {
    const newObj = {
      checkInDate: moment(date.start).format('YYYY-MM-DD'),
      checkOutDate: moment(date.end).format('YYYY-MM-DD'),
      numberPeople: adult, 
      region: JSON.stringify(region.region).replace(/"/g,""),
    };
    const queryString = queryToString(newObj);
    navigate(`/search${queryString}`);
  };


  const handleDateChange = ({ startDate, endDate }) => {
    setDate({ start: startDate, end: endDate });
  };
  

  const incrAdultQty = () => {
     setAdult(adult + 1);
  };

  const decrAdultQty = () => {
    adult === MIN_ADULT_NUM
      ? alert('최소 선택 인원은 1명입니다')
      : adult > 1 && setAdult(adult - 1);
  };

  const [region, setRegion] = useState({
    region: '',
    
  });

  const regInput = e => {
    setRegion({ ...region, region: e.target.value });
    console.log(JSON.stringify(e.target.value))
  };

  const dispatch = useDispatch();

  // 리덕스에 저장된 유저 정보 가져오기, 근데 여기서는 사용하지 않음
  const _user = useSelector((state) => state.user.user);

  // 로그인 확인을 위함
  const is_login = getCookie("is_login");
  const is_token = getCookie("Authorization");


  if (is_login && is_token) {
    const username = getCookie("username");
    return(
      <div className="App">
            <Routes>
            <Route path="/" element={
              <>
              <div className='headercontainer'>
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
              >
                {username}님
              </Text1>
            </div>
            </div>
            </div>
            </div>
            </div>
            <Link to="/AcmList"></Link>
              <div className='main'>
              <div className='main1'>
            <div className='main2'>한인민박은 하이
            <div className='mainsearch1'>
            <SearchWrap>  
            <input type="text" onChange={regInput} placeholder = '지역' region={region}/>  
              <div className='mainsearch2'>
              <Calendar
                start={date.start}
                end={date.end}
                handleDateChange={handleDateChange}
              />
              </div>
              <CountGuest
                adult={adult}
                incrAdultQty={incrAdultQty}
                decrAdultQty={decrAdultQty}
              />
              <SearchBtn onClick={goToList}>SEARCH</SearchBtn>
            </SearchWrap>
              </div>
            </div>
            </div>
            </div>
            <div className="container">
            
              <div data-aos="fade-up" data-aos-once="true" className='content1'>인기 여행지
              <div className='content2'>
              <Link to="/AcmList">MORE</Link></div>
                <div className='content3'>
                <Link to="/AcmList"><img src = {bg2} width='68' height='68'  ></img></Link>
                </div>
                </div>
      <Swiper
      data-aos="fade-up" data-aos-once="true"
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
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          slidesPerView={4}
          spaceBetween={9}
          //pagination={{
          //  clickable: true,
          //}}
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
     
      <div data-aos="fade-up" data-aos-once="true" className='content1'>커뮤니티 
        <div className='content4'>
        <Link to="/Join">MORE</Link></div>
            <div className='content3'>
            <Link to="/Join"><img src = {bg2} width='68' height='68'>
                  </img>
                </Link>
              </div>
            </div>
            <div data-aos="fade-up" data-aos-once="true" className='box1'>
            <Link to="/JoinBoard">
              <div className='boxtitle'>{글제목[0]}</div>
               <div className='boxcontent1'>{글내용[0]}</div> 
               <div className='boxcontent2'>{기간[0]}</div>
               <div className='texticon'><img src = {add} width='55' height='55'/></div>
               </Link>
               </div>
            <div data-aos="fade-up" data-aos-once="true" className='box2'>
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
        <Route path="/AcmList" element={<AcmList data={data} setData={setData}/> }/>
        <Route path="/Join" element={<Join/> }/>
        <Route path="/Acm/:id" element={<Acm/>}/>
        <Route path="/JoinBoard/:id" element={<JoinBoard/>}/>
        <Route path="/Room/:id" element={<Room/>}/>
        <Route path="/Mypage" element={<Mypage/> }/>
        <Route path="/Reser/:id" element={<Reser/> }/>
        <Route path="/ChangeUserInfo" element={<ChangeUserInfo/> }/>
        <Route path="/Payment/:id" element={<Payment/> }/>
        <Route path="/Login" element={<Login/> }/>
        <Route path="/JoinBoardWrite" element={<JoinBoardWrite/> }/>
        <Route path="/search" element={<AcmListSearch/>} />
        <Route path="/searchjoin" element={<JoinSearch/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/Withdraw" element={<Withdraw/>} />
        <Route path="/Withdraw_1" element={<Withdraw_1/>} />
      </Routes>
    </div>
    );
  }
  return (
    <div className="App">
            <Routes>
            <Route path="/" element={
              <>
              <div className='headercontainer'>
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
            {/* <Link to="/Login">LOGIN</Link> */}
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
            <div className='headermenu4'>
           {/* <Link to="/Signup">JOIN</Link> */}
            </div>
            </div>
            </div>
            </div>
            </div>
            <Link to="/AcmList"></Link>
              <div className='main'>
              <div className='main1'>
            <div className='main2'>한인민박은 하이
            <div className='mainsearch1'>
            <SearchWrap>  
            <input type="text" onChange={regInput} placeholder = '지역' region={region}/>  
              <div className='mainsearch2'>
              <Calendar
                start={date.start}
                end={date.end}
                handleDateChange={handleDateChange}
              />
              </div>
              <CountGuest
                adult={adult}
                incrAdultQty={incrAdultQty}
                decrAdultQty={decrAdultQty}
              />
              <SearchBtn onClick={goToList}>SEARCH</SearchBtn>
            </SearchWrap>
              </div>
            </div>
            </div>
            </div>
            <div className="container">
            
              <div data-aos="fade-up" data-aos-once="true" className='content1'>인기 여행지
              <div className='content2'>
              <Link to="/AcmList">MORE</Link></div>
                <div className='content3'>
                <Link to="/AcmList"><img src = {bg2} width='68' height='68'  ></img></Link>
                </div>
                </div>
      <Swiper
      data-aos="fade-up" data-aos-once="true"
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
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          slidesPerView={4}
          spaceBetween={9}
          //pagination={{
          //  clickable: true,
          //}}
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
     
      <div data-aos="fade-up" data-aos-once="true" className='content1'>커뮤니티 
        <div className='content4'>
        <Link to="/Join">MORE</Link></div>
            <div className='content3'>
            <Link to="/Join"><img src = {bg2} width='68' height='68'>
                  </img>
                </Link>
              </div>
            </div>
            <div data-aos="fade-up" data-aos-once="true" className='box1'>
            <Link to="/JoinBoard">
              <div className='boxtitle'>{글제목[0]}</div>
               <div className='boxcontent1'>{글내용[0]}</div> 
               <div className='boxcontent2'>{기간[0]}</div>
               <div className='texticon'><img src = {add} width='55' height='55'/></div>
               </Link>
               </div>
            <div data-aos="fade-up" data-aos-once="true" className='box2'>
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
        <Route path="/AcmList" element={<AcmList data={data} setData={setData}/> }/>
        <Route path="/Join" element={<Join/> }/>
        <Route path="/Acm/:id" element={<Acm/>}/>
        <Route path="/JoinBoard/:id" element={<JoinBoard/>}/>
        <Route path="/Room/:id" element={<Room/>}/>
        <Route path="/Mypage" element={<Mypage/> }/>
        <Route path="/Reser/:id" element={<Reser/> }/>
        <Route path="/ChangeUserInfo" element={<ChangeUserInfo/> }/>
        <Route path="/Payment/:id" element={<Payment/> }/>
        <Route path="/Login" element={<Login/> }/>
        <Route path="/JoinBoardWrite" element={<JoinBoardWrite/> }/>
        <Route path="/search" element={<AcmListSearch/>} />
        <Route path="/searchjoin" element={<JoinSearch/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/Withdraw" element={<Withdraw/>} />
        <Route path="/Withdraw_1" element={<Withdraw_1/>} />
      </Routes>
    </div>
  );
}


const MIN_ADULT_NUM = 1;
const MAX_ROOM_NUM = 9;
const MIN_ROOM_NUM = 1;

const SearchWrap = styled.div`
  ${({ theme }) => theme.flexCenter};
  margin-top: 20px;
`;

const SearchBtn = styled.div`
  ${({ theme }) => theme.flexCenter};
  // float:right;
  float:left;
  margin-top:25px;
  width: 116px;
  height: 44px;
  color: ${({ theme }) => theme.white};
  border: 1px solid #FFFFFF;
  outline: none;
  cursor: pointer;
  font-size:18px;
  padding-left:25px;
  padding-top:7px;
  &:hover{
    background-color: #fff;
    color: black;
    transition : 0.5s;
  };
`

export default App;
