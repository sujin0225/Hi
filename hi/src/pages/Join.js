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

function Join(){

    let [jointitle, b] = useState(['파리 여행하시는 분 계신가요?', '같이 맛있는거 드실 분!', '파리에 2주정도 있을 예정입니다...', '점심하실수 있으신분 구해요!!...', 
    '부분 동행 하실 분!','시티 투어 하실 분 있으신가요?', '햄버거 같이 드실 분!!', '전시 좋아하시는 분~~'
    ]);
    const { RangePicker } = DatePicker;
    const[filter,setfilter] = useState(['']);
    let [join, setjoin] = useState(['']);
    // let [test, setTest] = useState(null);

    // useEffect(() => {
    //   axios.get('http://54.180.155.179:8080/accommodation/list')
    //   .then((결과)=>{ 
    //    console.log(결과.data)
    //   })
    //   .catch(()=>{
    //     console.log('실패')
    //   })  
    // })
    

    const [boards, setBoards] = useState([]);


    useEffect(() => {
      axios({
        method:'GET',
        url:'http://54.180.155.179:8080/accommodation/list'
      }).then(response => setBoards(response.data))
    })
  


    const menu = (
        <Menu
          items={[
            {
              label: <a href="#">1st menu item</a>,
              key: '0',
            },
            {
              label: <a href="#">2nd menu item</a>,
              key: '1',
            },
            {
              type: 'divider',
            },
            {
              label: '3rd menu item',
              key: '3',
            },
          ]}
        />
      );
      

    return(
        
        <div className="Join">
   {/* <ul>
    {boards.map(board => (
      <li key={board.id}>{board.nameKor}</li>
    ))}
   </ul>  */}
            <div className="container"> 
                <div className='joinbox1'>
                    동행자 구하기
                
                </div>
                <div className='caltitle'>
                {/* <div style={{}}> */}
                <Calendar onChange={(value) => {
                    alert(`Your selected ${value.format('YYYY-MM-DD')}`)}} />
                    {/* </div> */}</div>
                </div>
                <div className="joinsearchbox">
                <div className="joinsearchbox1">
              {/* <div className="joinsearchbar">  */}
                    <Dropdown overlay={menu} trigger={['click'] }>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space style={{gap:94 , marginTop:110, paddingLeft:220, paddingRight:40}} >전체<DownOutlined /></Space></a></Dropdown>
                            <div className='joinsearchdata'>
                                    <input type="date" data-placeholder="동행시작일" required aria-required="ture"></input></div>
                                    <div className='joinsearchdata'>
                                        <input type="date" data-placeholder="동행종료일" required aria-required="ture"></input></div>
                                        <div className='joinbutton'><button type='button' onClick={()=>{ }}></button>기간 조회
                                        </div>
                                        <div className="joinsearchin">
                                          <div className="joinsearch1">
                                            <input placeholder="검색어를 입력하세요" onChange={(e)=> {}}></input>
                                            <a href='#1'><img src = {검색}/></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                   
                                        <div className="container">
                                            <div className='write'>
                    <button type='button' onClick={()=>{
                
            }}>작성하기</button></div>
            <div className="joinbox">
                <Joincontent jointitle={jointitle}></Joincontent>
                </div>
                <div className="joinmorebutton">더보기
                </div>
                </div>
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

function Joincontent(props){
    return (
      <div className='Join'>
          <div className="jointextbox1">
          <Link to="/JoinBoard">
            <div className="jointexttitl1">{props.jointitle[0]}</div>
            <div className="jointextcon">{props.jointitle[3]}</div>
            <div className="jointextcon1">동행 기간 2022 - 05 - 10 ~ 2022 - 05 - 11</div>
            <div className="jointexticon">
            <img src = {추가} width='55' height='55'/>
            </div>
            </Link>
          </div>
            <div className="jointextbox2">
            <Link to="/JoinBoard">
            <div className="jointexttitl1">{props.jointitle[1]}</div>
            <div className="jointextcon">파리 여행하시는 분 계신가요?</div>
            <div className="jointextcon1">동행 기간 2022 - 05 - 10 ~ 2022 - 05 - 11</div>
            <div className="jointexticon">
            <img src = {추가} width='55' height='55'/>
            </div>
            </Link>
            </div>
            <div className="jointextbox2">
            <Link to="/JoinBoard">
            <div className="jointexttitl1">{props.jointitle[2]}</div>
            <div className="jointextcon">오후에 같이 부분 동행 하실 분 구해요~!...</div>
            <div className="jointextcon1">동행 기간 2022 - 05 - 20 ~ 2022 - 05 - 22</div>
            <div className="jointexticon">
            <img src = {추가} width='55' height='55'/>
            </div>
            </Link>
            </div>
            <div className="jointextbox1">
            <Link to="/JoinBoard">
            <div className="jointexttitl1">{props.jointitle[3]}</div>
            <div className="jointextcon">인앤아웃 햄버거 같이 드실 분...</div>
            <div className="jointextcon1">동행 기간 2022 - 06 - 10 ~ 2022 - 06 - 15</div>
            <div className="jointexticon">
            <img src = {추가} width='55' height='55'/>
            </div>
            </Link>
            </div>
            <div className="jointextbox2">
            <Link to="/JoinBoard">
            <div className="jointexttitl1">{props.jointitle[4]}</div>
            <div className="jointextcon">{props.jointitle[3]}</div>
            <div className="jointextcon1">동행 기간 2022 - 05 - 13 ~ 2022 - 05 - 13</div>
            <div className="jointexticon">
            <img src = {추가} width='55' height='55'/>
            </div>
            </Link>
            </div>
            <div className="jointextbox2">
            <Link to="/JoinBoard">
            <div className="jointexttitl1">{props.jointitle[5]}</div>
            <div className="jointextcon">밤에 시티 투어 하려고 하는데 혹시...</div>
            <div className="jointextcon1">동행 기간 2022 - 05 - 10 ~ 2022 - 05 - 11</div>
            <div className="jointexticon">
            <img src = {추가} width='55' height='55'/>
            </div>
            </Link>
            </div>
          </div>
    )
  }


export default Join