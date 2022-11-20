import "./Reser.css";
import plus from '../img/그림33.png'
import { useEffect, useRef, useState } from 'react';
import drop from '../img/그림9.png'
import check from '../img/그림8.png'
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { useParams } from 'react-router-dom'
import { getCookie, setCookie } from "../pages/shared/Cookie";
import Calendar from '../pages/Calendar';
import Swal from "sweetalert2";
import moment from 'moment';
import { Link } from 'react-router-dom'
import Text1 from "../pages/elements/Text1";
import { useDispatch } from "react-redux";
import { actionCreators } from "../pages/redux/modules/user";
import { useNavigate } from 'react-router-dom';
import { actionCreators as userActions } from "../pages/redux/modules/user";

function Reser(){
  const [입력값, 입력값변경] = useState("");
  const options = ['카드1', '카드2']
  const [selected, setSelected] = useState("카드 선택");
  const [useCheck, setUseCheck] = useState(false);
  const [marketingCheck, setMarketingCheck] = useState(false);
  const [count, setCount] = useState(0);
  const [peoplecount, setPeopleCount] = useState(0);
  const { pathname } = useLocation();
  const [roomdata, setRoomData] = useState([]);
  const [data, setData] = useState([]);
  const { id } = useParams();
  const { roomId } = useParams();
  const { price } = useParams();
  const [date, setDate] = useState({ start: null, end: null });
  const [enquiry, setEnquiry] = useState("");

  useEffect(() => {
    const jwtToken = getCookie('Authorization');
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
    console.log(jwtToken)
    axios.get(`/reservation/${id}`)
    .then(res => {setData(res.data)
      console.log(res.data)})
  },[]);

  


  const reservationDB = () => {
    
      // try {
        const jwtToken = getCookie('Authorization');
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        console.log(jwtToken)
        axios.post("/reservation/new", {
          totalAmount: price,
          roomId: Number(id),
          enquiry: enquiry,
          checkInDate: moment(date.start).format('YYYY-MM-DD'),
          checkOutDate: moment(date.end).format('YYYY-MM-DD'),
        }).then(res=>{
          console.log(res)
          Swal.fire({
            icon: 'success',
            title: "성공적으로 예약 하셨습니다",
            confirmButtonColor: "#668FA1",
            confirmButtonText: "확인",
          }).then(function(){
            
            window.location.replace(`/`);
          })
        })
        
        
  //     // } catch (err) {
  //     //   alert("예약에 실패했습니다.");
  //     //   console.log(err);
  //     // }
    
  };
  // const reservationDB = (price, roomId) => {
  //   return async function (dispatch, getState, { history }) {
  //     try {
  //       const jwtToken = getCookie('Authorization');
  //       axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
  //       console.log(jwtToken)
  //       const reservation = await axios.post("/reservation/new", {
  //         totalAmount: price,
  //         roomId: Number(roomId),
  //         enquiry: enquiry,
  //         checkInDate: moment(date.start).format('YYYY-MM-DD'),
  //         checkOutDate: moment(date.end).format('YYYY-MM-DD'),
  //       });
  //       console.log(reservation);
  //       Swal.fire({
  //         icon: 'success',
  //         title: "성공적으로 예약 하셨습니다",
  //         confirmButtonColor: "#668FA1",
  //         confirmButtonText: "확인",
  //       }).then(function(){
          
  //         window.location.replace(`/Payment/${id}`);
  //       })
  //     } catch (err) {
  //       alert("예약에 실패했습니다.");
  //       console.log(err);
  //     }
  //   };
  // };
  
  // useEffect(() => {
  //   axios.get(`/accommodation/${id}`)
  //   .then((res) => {
  //     setRoomData(res.data.rooms)
  //     console.log(res)})
  // },[]);
  const is_login = getCookie("is_login");
  const is_token = getCookie("Authorization");

  // const nameKor = getCookie("nameKor");
  // const roomname1 = getCookie("roomname1");
  // const roomname2 = getCookie("roomname2");
  // const price = getCookie("price");
  // const roomid = getCookie("roomid");

  // const handleQuantity = (type) => {
  //   if (type === "plus") {
  //     setCount(count + 1);
  //   } else {
  //     if (count === 0) return;
  //     setCount(count - 1);
  //   }
  // };

  // const PeoplehandleQuantity = (type) => {
  //   if (type === "plus") {
  //     setPeopleCount(peoplecount + 1);
  //   } else {
  //     if (peoplecount === 0) return;
  //     setPeopleCount(peoplecount - 1);
  //   }
  // };

  const handleDateChange = ({ startDate, endDate }) => {
    setDate({ start: startDate, end: endDate });
  };

  const handleenquiryInput = e => {
    setEnquiry(e.target.value);
  };

  const useBtnEvent =()=>{
    if(useCheck === false) {
      setUseCheck(true)
    }else {
      setUseCheck(false)
    }
  };

  const marketingBtnEvent =()=>{
    if(marketingCheck === false){
      setMarketingCheck(true)
    }else {
      setMarketingCheck(false)
    }
  };

  useEffect(() => {
    window.scrollTo(0,0);
}, [pathname]);


// dispatch(
//   userActions.reservationDB(totalAmount, roomId, enquiry, checkInDate, checkOutDate)
// );

const dispatch = useDispatch();
const navigate = useNavigate();


if (is_login && is_token) {
  const username = getCookie("username");
return(
    <div className="Reser">
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
    <div className="resercontainer">
      <div className="resertit">예약</div>
    </div>
    <div className="reserbox1">
    <div className="resercontainer">
      <div className="reserboxtext">숙소</div>
      <div className="reserboxtext1">객실</div>
      <div className="reserboxtext1">날짜</div>
      <div className="reserboxtext2">{data.accommodationName}</div>
      <div className="reserboxtext3">{data.roomName}</div>
      <div className="reserboxtext4"> 
      <Calendar
        start={date.start}
        end={date.end}
        handleDateChange={handleDateChange}
      /></div>
      </div>
    </div>
    <div className="resercontainer">
      <div className="resertext1">{data.accommodationName}</div>
      <div className="resertext2">{data.roomName}</div>
      <div className="reserline"></div>
      {/* <div className="resertext3">조식 추가</div>
      <div className="reserline1"></div>
      <div className="resertext4">20,000</div>
      <div className="reserbutton1" onClick={() => handleQuantity("plus")}>
      <img src = {plus} width='16' height='16'/>
      </div>
      <div className="reserbuttontext">{count}</div>
      <div className="reserbutton1" onClick={() => handleQuantity("minus")}>
        <div className="reserbuttonminus"></div>
      </div>
      <div className="resertext5">인원 추가</div>
      <div className="reserline2"></div>
      <div className="resertext6">40,000</div>
      <div className="reserbutton2" onClick={() => PeoplehandleQuantity("plus")}>
      <img src = {plus} width='16' height='16'/>
      </div>
      <div className="reserbuttontext1">{peoplecount}</div>
      <div className="reserbutton2" onClick={() => PeoplehandleQuantity("minus")}>
        <div className="reserbuttonminus"></div>
      </div> */}
      <div className="resertext11">예약 고객 정보 확인</div>
      
      <div className="resertext7">예약자</div>
      <div className="resertext8">{data.userNameKor}</div>
      {/* <div className="resertext9">대한민국</div> */}
      <div className="resertext7">휴대전화</div>
      <div className="resertext8">{data.phoneNumber}</div>
      {/* <div className="resertext11">
      <input onChange={(e)=> {입력값변경(e.target.value);
              console.log(입력값);}}></input>
      </div> */}
      {/* <div className="resertext10">E-MAIL *</div>
      <div className="resertext11">
      <input onChange={(e)=> {입력값변경(e.target.value);
              console.log(입력값);}}></input><div className="reserbutton"><button type='button' onClick={()=>{
                
              }}>중복 확인</button></div>
      </div>
      <div className="resertext10">CREDIT CARD TYPE *</div>
      <Dropdown selected={selected} setSelected={setSelected}/>
      <div className="resertext10">CARD NUMBER *</div>
      <div className="resertext11">
      <input onChange={(e)=> {입력값변경(e.target.value);
              console.log(입력값);}}></input><div className="reserbutton"></div>
      </div>
      <div className="resertext10">EXPIRY DATE *</div>
      <div className="resertext11">
      <input onChange={(e)=> {입력값변경(e.target.value);
              console.log(입력값);}}></input><div className="reserbutton"></div>
      </div>
      <div className="resertext10">CARD PASSWORD *</div>
      <div className="resertext11">
      <input onChange={(e)=> {입력값변경(e.target.value);
              console.log(입력값);}}></input><div className="reserbutton"></div>
      </div> */}
      <div className="reseragree1">신용카드 정보 수집 및 이용 동의</div>
      <div className="reseragree2"></div>
      <div className="reseragree3">
      <input type="checkbox" id="check2" checked={useCheck} onChange={useBtnEvent}/>
      <label for="check2">[선택] 다음번 신용카드 정보 재사용을 위해  위 신용카드 정보를 저장하는데 동의하십니까?</label>
      </div>
      <div className="reseragreebox1">
        <div className="reseragreebox2">
          <div className="reseragreeboxtext1">
          수집 항목
          </div>
          </div>
        <div className="reseragreebox3">
        <div className="reseragreeboxtext1">
          수집 목적
          </div>
        </div>
        <div className="reseragreebox3">
        <div className="reseragreeboxtext1">
          보유 기간
          </div>
        </div>
        <div className="reseragreebox4"></div>
        <div className="reseragreebox5"></div>
        <div className="reseragreebox5"></div>
      </div>
      <div className="reseragreeboxtext2">* 상기 개인정보 수집 이용에 대한 동의를 거부할 수 있으나 동의 거부 시 신용카드 정보 재사용이 제한됩니다</div>
      <div className="reseragree1">취소 규정</div>
      <div className="reseragree2"></div>
      <div className="reseragree3">
      <input type="checkbox" id="check3" checked={marketingCheck} onChange={marketingBtnEvent}/>
      <label for="check3">[필수] 취소 및 노쇼(NO-SHOW) 규정에 동의합니다.</label>
      </div>
      <div className="reseragreebox6">
        <div className="reseragreeboxtext3">30일전 취소시 전액 환불(포인트/쿠폰 결제액 제외), 포인트 적립 없음</div>
        <div className="reseragreeboxtext4">29일 ~ 15일 전 취소시 90% 환불, 포인트 적립 8%</div>
        <div className="reseragreeboxtext4">14일 ~ 7일 전 취소시 80% 환불, 포인트 적립 8%</div>
        <div className="reseragreeboxtext4">6일 ~ 1일 전 취소 70% 환불, 포인트 적립 없음</div>
        <div className="reseragreeboxtext4">당일취소 및 No-Show 환불불가, 포인트 적립 없음</div>
      </div>
      <div className="reseragree1">문의 사항</div>
      <div className="reseragree2"></div>
      <div className="reseragreeboxtext5">
      <input placeholder="숙소 이용 시 문의하실 사항이 있으시면 입력해 주세요." 
       value={enquiry}
      onChange={handleenquiryInput}></input>
      </div>
      <div className="resertotalbox">
        {/* <div className="resertotal">2022.05.15</div>
        <div className="resertotal1">{54900 + 40000 * peoplecount}</div>
        <div className="resertotal2">조식 추가</div>
        <div className="resertotal3">{20000 * count}</div>
        <div className="resertotalline"></div> */}
        <div className="resertotal4">총 예약금액</div>
        <div className="resertotal5">{data.price}원</div>
      </div>
      <button className="resertotalbutton" onClick={reservationDB} >예약 하기</button>
      
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
  <div className="AcmMain">
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
  <div className="resercontainer">
    <div className="resertit">예약</div>
  </div>
  <div className="reserbox1">
  <div className="resercontainer">
    <div className="reserboxtext">숙소</div>
    <div className="reserboxtext1">객실</div>
    <div className="reserboxtext1">날짜</div>
    <div className="reserboxtext2">{}</div>
    <div className="reserboxtext3">{}</div>
    <div className="reserboxtext4"> 
    <Calendar
      start={date.start}
      end={date.end}
      handleDateChange={handleDateChange}
    /></div>
    </div>
  </div>
  <div className="resercontainer">
    <div className="resertext1">{}</div>
    <div className="resertext2">{}</div>
    <div className="reserline"></div>
    {/* <div className="resertext3">조식 추가</div>
    <div className="reserline1"></div>
    <div className="resertext4">20,000</div>
    <div className="reserbutton1" onClick={() => handleQuantity("plus")}>
    <img src = {plus} width='16' height='16'/>
    </div>
    <div className="reserbuttontext">{count}</div>
    <div className="reserbutton1" onClick={() => handleQuantity("minus")}>
      <div className="reserbuttonminus"></div>
    </div>
    <div className="resertext5">인원 추가</div>
    <div className="reserline2"></div>
    <div className="resertext6">40,000</div>
    <div className="reserbutton2" onClick={() => PeoplehandleQuantity("plus")}>
    <img src = {plus} width='16' height='16'/>
    </div>
    <div className="reserbuttontext1">{peoplecount}</div>
    <div className="reserbutton2" onClick={() => PeoplehandleQuantity("minus")}>
      <div className="reserbuttonminus"></div>
    </div>
    <div className="resertext7">RESERVATION NAME *</div>
    <div className="resertext8">김하이</div>
    <div className="resertext9">대한민국</div>
    <div className="resertext10">PHONE NUMBER *</div>
    <div className="resertext11">
    <input onChange={(e)=> {입력값변경(e.target.value);
            console.log(입력값);}}></input>
    </div>
    <div className="resertext10">E-MAIL *</div>
    <div className="resertext11">
    <input onChange={(e)=> {입력값변경(e.target.value);
            console.log(입력값);}}></input><div className="reserbutton"><button type='button' onClick={()=>{
              
            }}>중복 확인</button></div>
    </div>
    <div className="resertext10">CREDIT CARD TYPE *</div>
    <Dropdown selected={selected} setSelected={setSelected}/>
    <div className="resertext10">CARD NUMBER *</div>
    <div className="resertext11">
    <input onChange={(e)=> {입력값변경(e.target.value);
            console.log(입력값);}}></input><div className="reserbutton"></div>
    </div>
    <div className="resertext10">EXPIRY DATE *</div>
    <div className="resertext11">
    <input onChange={(e)=> {입력값변경(e.target.value);
            console.log(입력값);}}></input><div className="reserbutton"></div>
    </div>
    <div className="resertext10">CARD PASSWORD *</div>
    <div className="resertext11">
    <input onChange={(e)=> {입력값변경(e.target.value);
            console.log(입력값);}}></input><div className="reserbutton"></div>
    </div> */}
    <div className="reseragree1">신용카드 정보 수집 및 이용 동의</div>
    <div className="reseragree2"></div>
    <div className="reseragree3">
    {/* <input type="checkbox" id="check2" checked={useCheck} onChange={useBtnEvent}/> */}
    <label for="check2">[선택] 다음번 신용카드 정보 재사용을 위해  위 신용카드 정보를 저장하는데 동의하십니까?</label>
    </div>
    <div className="reseragreebox1">
      <div className="reseragreebox2">
        <div className="reseragreeboxtext1">
        수집 항목
        </div>
        </div>
      <div className="reseragreebox3">
      <div className="reseragreeboxtext1">
        수집 목적
        </div>
      </div>
      <div className="reseragreebox3">
      <div className="reseragreeboxtext1">
        보유 기간
        </div>
      </div>
      <div className="reseragreebox4"></div>
      <div className="reseragreebox5"></div>
      <div className="reseragreebox5"></div>
    </div>
    <div className="reseragreeboxtext2">* 상기 개인정보 수집 이용에 대한 동의를 거부할 수 있으나 동의 거부 시 신용카드 정보 재사용이 제한됩니다</div>
    <div className="reseragree1">취소 규정</div>
    <div className="reseragree2"></div>
    <div className="reseragree3">
    {/* <input type="checkbox" id="check3" checked={marketingCheck} onChange={marketingBtnEvent}/> */}
    <label for="check3">[필수] 취소 및 노쇼(NO-SHOW) 규정에 동의합니다.</label>
    </div>
    <div className="reseragreebox6">
      <div className="reseragreeboxtext3">30일전 취소시 전액 환불(포인트/쿠폰 결제액 제외), 포인트 적립 없음</div>
      <div className="reseragreeboxtext4">29일 ~ 15일 전 취소시 90% 환불, 포인트 적립 8%</div>
      <div className="reseragreeboxtext4">14일 ~ 7일 전 취소시 80% 환불, 포인트 적립 8%</div>
      <div className="reseragreeboxtext4">6일 ~ 1일 전 취소 70% 환불, 포인트 적립 없음</div>
      <div className="reseragreeboxtext4">당일취소 및 No-Show 환불불가, 포인트 적립 없음</div>
    </div>
    <div className="reseragree1">문의 사항</div>
    <div className="reseragree2"></div>
    <div className="reseragreeboxtext5">
    <input placeholder="숙소 이용 시 문의하실 사항이 있으시면 입력해 주세요." 
     value={enquiry}
    onChange={handleenquiryInput}></input>
    </div>
    <div className="resertotalbox">
      {/* <div className="resertotal">2022.05.15</div>
      <div className="resertotal1">{54900 + 40000 * peoplecount}</div>
      <div className="resertotal2">조식 추가</div>
      <div className="resertotal3">{20000 * count}</div>
      <div className="resertotalline"></div> */}
      <div className="resertotal4">총 예약금액</div>
      <div className="resertotal5">{}원</div>
    </div>
    <button className="resertotalbutton" onClick={reservationDB}>예약 하기</button>
    
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


// function Dropdown({selected, setSelected}){
//   const [isActive, setIsActive] = useState(false);
//   const options = ['카드 1', '카드 2', '카드 3']
//   return(
//     <div className="dropdown">
//           <div className="dropdown-btn" onClick={(e) =>
//           setIsActive(!isActive)}>
//             {selected}
//             <img src = {drop} width='39' height='39'/>
//             </div>
//           {isActive && (
//             <div className="dropdown-content">
//               {options.map((option) => (
//                 <div 
//                 onClick={(e) => {
//                   setSelected(option);
//                   setIsActive(false);
//                 }}
//             className="dropdown-item">
//               {option}
//             </div>
//               ))}
              
//           </div>
//           )}
          
//         </div>
//   )
// }


export default Reser;