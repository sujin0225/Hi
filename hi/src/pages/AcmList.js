import { useEffect, useRef, useState, useCallback } from 'react';
import "./AcmList.css";
import lodging from '../img/숙소.png'
import axios from 'axios';
import acmlistdata from './acmlistdata';
import { Routes, Route, Link, useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import styled from 'styled-components'
import SearchList from '../pages/SearchList';
import Aos from "aos";
import "aos/dist/aos.css";
import { useLocation } from 'react-router-dom';
import { useMatch } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { stringToQuery, queryToString } from '../pages/queryString';
import Calendar from '../pages/Calendar';
import CountGuest from '../pages/CountGuest';
import moment from 'moment';
import Text1 from "../pages/elements/Text1";
import { actionCreators } from "../pages/redux/modules/user";
import { getCookie } from "../pages/shared/Cookie";
import { useDispatch } from "react-redux";


function AcmList(){

  const [selected, setSelected] = useState(null)
  const toggle = (i) => {
      if(selected === i){
          return setSelected(null)
      }
      setSelected(i)
  }

  const [contents, setContents] = useState(null);
  const [loading, setLoading] = useState(false);
  let [listdata] = useState(acmlistdata)
  let [입력값, 입력값변경] = useState('');
  const [acmlist, setAcmlist] = useState([]);
  const {id} = useParams();
  const [date, setDate] = useState({ start: null, end: null });
  const [adult, setAdult] = useState(1);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(6);
  
  
  useEffect(() => {
    axios.get('/accommodation')
    .then(res => setData(res.data))
  },[]);


  const handlePageChange = (page) => { setPage(page); };
  const itemChange = (e) => {
    setItems(Number(e.target.value))

  }

  const [region, setRegion] = useState({
    region: '',
    
  });

  const regInput = e => {
    setRegion({ ...region, region: e.target.value });
    console.log(JSON.stringify(e.target.value))
  };

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

  moment.updateLocale("es", {
    invalidDate: ''
  });

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

console.log(items*(page-1), items*(page-1)+items)

const is_login = getCookie("is_login");
const is_token = getCookie("Authorization");

const dispatch = useDispatch();

if (is_login && is_token) {
  const username = getCookie("username");
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
            {username}님
            <Text1
                  color="black"
                  onClick={() => {
                    dispatch(actionCreators.logoutDB());
                  }}
                >
                   로그아웃 
                </Text1>
            </div>
            <div className='acmlistheadermenu4'>
            </div>
            </div>
            </div>
            </div>
            </div>
            <Link to="/AcmList"></Link>
      <div className="container"> 
          <div className="search">
            <div className="Listsearch1">
            <SearchWrap>  
            <input type="text" onChange={regInput} placeholder = '지역' region={region}/>  
              <div className='mainsearch2'>
              <Calendar
                start={date.start}
                end={date.end}
                handleDateChange={handleDateChange}
              />
              </div>
              <div className='Listsearch2'>
              <CountGuest
                adult={adult}
                incrAdultQty={incrAdultQty}
                decrAdultQty={decrAdultQty}
              />
              </div>
              <SearchBtn onClick={goToList}>SEARCH</SearchBtn>
            </SearchWrap>
      </div>
        </div>  
        <div className='accordion'>
        {data1.map((item, i) => (
                <div className='item'> 
                    <div className='title' onClick={() => toggle(i)}>
                        {item.question}
                        <span>{selected === i ? '-' : '+'}</span>
                    </div>
                    <div className={selected === i ? 'content0001 show' : 'content0001'}>
               {item.answer}
               </div>
                </div>
            ))}
        <input className="button1" id="button1" type="submit" onClick={()=>{
        }} value={"적용"}></input>
        </div>
        
        
        <div className='lodgingbox'>
        
    <div className='AcmMain'>
    

{data.slice(
        items*(page-1),
        items*(page-1)+items,
        // contents.list
      ).map((content,i) => {
        return (
          <div data-aos="fade-up" data-aos-once="true" className='AcmMain'>
          <div className='lodgingbox2'>
          <Link to={`/Acm/${content.id}`} >
            <img src = {content.imageUrls[0]} width='450' height='370'/>
            <div className='lodgingtitle'>{content.nameKor}</div>
            <div className='lodgingcontent'>{content.region}</div>
            <div className='lodgingcontent1'>{content.priceKor}원~</div>
            <div className='lodgingcontent2'>{content.rating}/5.0</div>
           </Link>
           </div>
          </div> 
        )
      })}
    
      </div>

        <div className='acmlistinterval'>
        
        <Pagination
          activePage={page}
          itemsCountPerPage={items}
          totalItemsCount={data.length-1}
          pageRangeDisplayed={6}
          onChange={handlePageChange}>
        </Pagination>
      
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

return (
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
  <div className="container"> 
      <div className="search">
        <div className="Listsearch1">
        <SearchWrap>  
        <input type="text" onChange={regInput} placeholder = '지역' region={region}/>  
          <div className='mainsearch2'>
          <Calendar
            start={date.start}
            end={date.end}
            handleDateChange={handleDateChange}
          />
          </div>
          <div className='Listsearch2'>
          <CountGuest
            adult={adult}
            incrAdultQty={incrAdultQty}
            decrAdultQty={decrAdultQty}
          />
          </div>
          <SearchBtn onClick={goToList}>SEARCH</SearchBtn>
        </SearchWrap>
  </div>
    </div>  
    <div className='accordion'>
    {data1.map((item, i) => (
            <div className='item'> 
                <div className='title' onClick={() => toggle(i)}>
                    {item.question}
                    <span>{selected === i ? '-' : '+'}</span>
                </div>
                <div className={selected === i ? 'content0001 show' : 'content0001'}>
           {item.answer}
           </div>
            </div>
        ))}
    <input className="button1" id="button1" type="submit" onClick={()=>{
    }} value={"적용"}></input>
    </div>
    
    
    <div className='lodgingbox'>
    
<div className='AcmMain'>


{data.slice(
    items*(page-1),
    items*(page-1)+items,
    // contents.list
  ).map((content,i) => {
    return (
      <div data-aos="fade-up" data-aos-once="true" className='AcmMain'>
      <div className='lodgingbox2'>
      <Link to={`/Acm/${content.id}`} >
        <img src = {content.imageUrls[0]} width='450' height='370'/>
        <div className='lodgingtitle'>{content.nameKor}</div>
        <div className='lodgingcontent'>{content.region}</div>
        <div className='lodgingcontent1'>{content.priceKor}원~</div>
        <div className='lodgingcontent2'>{content.rating}/5.0</div>
       </Link>
       </div>
      </div> 
    )
  })}

  </div>

    <div className='acmlistinterval'>
    
    <Pagination
      activePage={page}
      itemsCountPerPage={items}
      totalItemsCount={data.length-1}
      pageRangeDisplayed={6}
      onChange={handlePageChange}>
    </Pagination>
  
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

const data1 = [
  {
      question: '객실 유형',
      answer : 
      '내용1',
  },
  {
      question: '가격 범위',
      answer : '내용2',
  },
  {
      question: '식사 제공',
      answer : '내용3',
  },
  {
      question: '편의 시설',
      answer : '내용4',
  },
  {
      question: '공용 시설',
      answer : '내용5',
  }
]

const STAR = ['5', '4', '3', '2', '1'];
const SORTING_CATEGORY = ['1', '2', '3', '4'];

const RoomlistsWrapper = styled.div`
  border: 3px solid orange;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;
const ListsWrapper = styled.div`
  display: flex;
`;

const RoomInfoWrap = styled.div``;


const SearchWrap = styled.div`
  ${({ theme }) => theme.flexCenter};
  margin-top: 20px;
`;

const SearchBtn = styled.div`
  ${({ theme }) => theme.flexCenter};
  // float:right;
  float:left;
  width: 125px;
  height: 80px;
  color: #F2F2F2;
  border: 1px solid #FFFFFF;
  outline: none;
  cursor: pointer;
  font-size:24px;
  font-family:'Gowun Batang';
  background-color:#668FA1;
  padding-top:20px;
  };
`
const MIN_ADULT_NUM = 1;


export default AcmList;