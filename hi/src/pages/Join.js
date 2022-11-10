import FullCalendar from "@fullcalendar/react"
import React from "react"
import dayGridPlugin from '@fullcalendar/daygrid'
import './Join.css';
import { useEffect, useRef, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import "antd/dist/antd.css";
import { Calendar } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { DatePicker } from 'antd';
import 검색 from '../img/검색.png'
import 추가 from '../img/그림7.png'
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { stringToQuery, queryToString } from '../pages/queryString';
import qs from "qs";
import Pagination from 'react-js-pagination'
import styled from 'styled-components';
import CountGuest from '../pages/CountGuest';
import moment from 'moment';
import CalendarJoin from '../pages/CalendarJoin';
import { useParams } from 'react-router-dom'
import Text1 from "../pages/elements/Text1";
import { actionCreators } from "../pages/redux/modules/user";
import { getCookie } from "../pages/shared/Cookie";
import { useDispatch } from "react-redux";


function Join(){
    const { id } = useParams();
    const [data, setData] = useState([]);
    const { RangePicker } = DatePicker;
    const[filter,setfilter] = useState(['']);
    let [join, setjoin] = useState(['']);
    const [page, setPage] = useState(1);
    const [items, setItems] = useState(6);
    const [posts, setPosts] = useState([]); 
    const [date, setDate] = useState({ start: null, end: null });
    const [adult, setAdult] = useState(1);
    const navigate = useNavigate();
    const [comdata, setComData] = useState([]); 

        useEffect(() => {
          axios.get(`/api/board/join/list`, {
            params: {
              page:'1',
              pageSize:'100'
            }
          })
          .then(res => setPosts(res.data.boards))
        },[]);
    
        // useEffect(() => {
        //   axios.get('/accommodation')
        //   .then(res => setData(res.data))
        // },[]);

        // useEffect(() => {
        //   axios.get(`/api/comments/list`, {
        //     params: {
        //       board_id:''
        //     }
        //   })
        //   .then(res => setPosts(res.data.boards))
        // },[]);

        

    
    const handleDateChange = ({ startDate, endDate }) => {
      setDate({ start: startDate, end: endDate });
    };
      
      const handlePageChange = (page) => { setPage(page); };
      const itemChange = (e) => {
        setItems(Number(e.target.value))
      
      }
      
      console.log(items*(page-1), items*(page-1)+items)

      const [region, setRegion] = useState({
        region: '',
        
      });

      const [title, setTitle] = useState({
        title: '',
        
      });
    
      const regInput = e => {
        setRegion({ ...region, region: e.target.value });
        console.log(JSON.stringify(e.target.value))
      };

      const titInput = e => {
        setTitle({ ...title, title: e.target.value });
        console.log(JSON.stringify(e.target.value))
      };


    const goToList = () => {
      const newObj = {
        region: JSON.stringify(region.region).replace(/"/g,""),
        title: JSON.stringify(title.title).replace(/"/g,""),
        go_with_start: moment(date.start).format('YYYY-MM-DD'),
        go_with_end: moment(date.end).format('YYYY-MM-DD'),
      };
      const queryString = queryToString(newObj);
      navigate(`/searchjoin${queryString}`);
    };

    moment.updateLocale("es", {
      invalidDate: ''
    });


    const is_login = getCookie("is_login");
    const is_token = getCookie("Authorization");

    const dispatch = useDispatch();

    if (is_login && is_token) {
      const username = getCookie("username");
    return(
        <div className="Join">
          <div className='joinheadercontainer'>
      <div className="joincontainer">
        <div className="joinheader">
          <div className="joinheaderlogo">
          <Link to="/">하이</Link>
            <div className='joinheadermenu1'>
            <Link to="/AcmList">숙소</Link>
            </div>
            <div className='joinheadermenu2'>
            <Link to="/Join">커뮤니티</Link>
            </div>
            <div className='joinheadermenu3'>
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
            <div className="container"> 
                <div className='joinbox1'>
                    동행자 구하기
                </div>
                <div className='caltitle'>
                <Calendar onChange={(value) => {
                    alert(`Your selected ${value.format('YYYY-MM-DD')}`)}} />
                  </div>
                </div>
        <div className="joinsearchbox">
        <div className="container">
            <div className="joinsearchbar">
            <SearchWrap>  
              <div className="joinsearchdata">
            <input type="text" onChange={regInput} placeholder = '지역' region={region}/>   
            </div> 
              <div className='mainsearch2'>
              <CalendarJoin
                start={date.start}
                end={date.end}
                handleDateChange={handleDateChange}
              />
              </div>
              <div className='Listsearch2'>
              </div>
              <SearchBtn onClick={goToList}>조회</SearchBtn>
              <div className="joinsearch1">
            <input type="text" onChange={titInput} placeholder = '제목을 입력해 보세요' title={title}/>  
            </div>
            </SearchWrap>
            </div>
        </div>  
        </div>
        <div className="container">
          <Link to="/JoinBoardWrite">
              <div className='write'>
                <button type='button' onClick={()=>{
            }}>작성하기</button></div></Link>
            <div className="joinbox">
                {posts&&posts.slice(
        items*(page-1),
        items*(page-1)+items,
        // contents.list
      ).map((item,i) => {
        return (
         
         <div className="jointextbox1">
          {/* <Link to={`/JoinBoard/${item.board_id}`} > */}
          <Link to={`/JoinBoard/${item.board_id}`} >
            <div className="jointexttitl1">{item.title}</div>
            <div className="jointextcon">{item.content}</div>
            <div className="jointextcon1">동행 기간{" "}{item.go_with_start}{" "}~{" "}{item.go_with_end}</div>
            <div className="jointexticon">
            <img src = {추가} width='55' height='55'/>
            </div>
            </Link>
          </div>
          
        )
      })}
                </div>
                </div>
                <Pagination
          activePage={page}
          itemsCountPerPage={items}
          totalItemsCount={posts.length-1}
          pageRangeDisplayed={6}
          onChange={handlePageChange}>
        </Pagination>
                <div className="interval"></div>
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
        
            
        </div>

    )
}

return(
  <div className="Join">
    <div className='joinheadercontainer'>
<div className="joincontainer">
  <div className="joinheader">
    <div className="joinheaderlogo">
    <Link to="/">하이</Link>
      <div className='joinheadermenu1'>
      <Link to="/AcmList">숙소</Link>
      </div>
      <div className='joinheadermenu2'>
      <Link to="/Join">커뮤니티</Link>
      </div>
      <div className='joinheadermenu3'>
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
      <div className='joinheadermenu4'>
      </div>
      </div>
      </div>
      </div>
      </div>
      <Link to="/AcmList"></Link>
      <div className="container"> 
          <div className='joinbox1'>
              동행자 구하기
          </div>
          <div className='caltitle'>
          <Calendar onChange={(value) => {
              alert(`Your selected ${value.format('YYYY-MM-DD')}`)}} />
            </div>
          </div>
  <div className="joinsearchbox">
  <div className="container">
      <div className="joinsearchbar">
      <SearchWrap>  
        <div className="joinsearchdata">
      <input type="text" onChange={regInput} placeholder = '지역' region={region}/>   
      </div> 
        <div className='mainsearch2'>
        <CalendarJoin
          start={date.start}
          end={date.end}
          handleDateChange={handleDateChange}
        />
        </div>
        <div className='Listsearch2'>
        </div>
        <SearchBtn onClick={goToList}>조회</SearchBtn>
        <div className="joinsearch1">
      <input type="text" onChange={titInput} placeholder = '제목을 입력해 보세요' title={title}/>  
      </div>
      </SearchWrap>
      </div>
  </div>  
  </div>
  <div className="container">
    <Link to="/JoinBoardWrite">
        <div className='write'>
          <button type='button' onClick={()=>{
      }}>작성하기</button></div></Link>
      <div className="joinbox">
          {posts&&posts.slice(
  items*(page-1),
  items*(page-1)+items,
  // contents.list
).map((item,i) => {
  return (
   
   <div className="jointextbox1">
    {/* <Link to={`/JoinBoard/${item.board_id}`} > */}
    <Link to={`/JoinBoard/${item.board_id}`} >
      <div className="jointexttitl1">{item.title}</div>
      <div className="jointextcon">{item.content}</div>
      <div className="jointextcon1">동행 기간{" "}{item.go_with_start}{" "}~{" "}{item.go_with_end}</div>
      <div className="jointexticon">
      <img src = {추가} width='55' height='55'/>
      </div>
      </Link>
    </div>
    
  )
})}
          </div>
          </div>
          <Pagination
    activePage={page}
    itemsCountPerPage={items}
    totalItemsCount={posts.length-1}
    pageRangeDisplayed={6}
    onChange={handlePageChange}>
  </Pagination>
          <div className="interval"></div>
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
  
      
  </div>

)
}

const SearchWrap = styled.div`
  ${({ theme }) => theme.flexCenter};
  margin-top: 20px;
`;

const MIN_ADULT_NUM = 1;

const SearchBtn = styled.div`
  ${({ theme }) => theme.flexCenter};
  // float:right;
  float:left;
  margin-top:90px;
  margin-left:29px;
  width: 151px;
  height: 44px;
  color: #FEFEFE;
  // border: 1px solid #FFFFFF;
  background-color: #668FA1;
  outline: none;
  cursor: pointer;
  font-size:18px;
  padding-left:5px;
  padding-top:7px;
  font-family:'Noto Sans KR';
  // &:hover{
  //   background-color: #668FA1;
  //   color: black;
  //   transition : 0.5s;
  // };
`

export default Join