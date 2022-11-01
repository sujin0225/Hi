import "./JoinBoardWrite.css";
import { useEffect , useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import dropdown from '../img/그림9.png'
import ReactHtmlParser from 'react-html-parser';
import axios from "axios";
import CalendarJoin from '../pages/CalendarJoin';
import moment from 'moment';

function JoinBoardWrite(){
  // const [selected1, setSelected1] = useState("지역 선택");  
  // const [selected2, setSelected2] = useState("일정 선택"); 
  // const [selected3, setSelected3] = useState("성별 선택"); 
  // const [selected4, setSelected4] = useState("모집인원 선택");  



  const [content, setContent] = useState({
    title: '',
    region:'',
    content: '',
    nickname:'',
    together: parseInt(1)
  }) 

  const [viewContent, setViewContent] = useState([]);
  const [date, setDate] = useState({ start: null, end: null });

  const handleDateChange = ({ startDate, endDate }) => {
    setDate({ start: startDate, end: endDate });
  };

//   const userData = {
//       title: content.title,
//       region: content.region,
//       go_with_start: moment(date.start).format('YYYY-MM-DD'),
//       go_with_end: moment(date.end).format('YYYY-MM-DD'),
//       content: content.content,
//       nickname: content.nickname,
//       together:content.together
// };

const submitReview = ()=>{
  axios.post('http://44.205.147.63:8080/api/board/join', JSON.stringify({
    title: content.title,
      region: content.region,
      go_with_start: moment(date.start).format('YYYY-MM-DD'),
      go_with_end: moment(date.end).format('YYYY-MM-DD'),
      content: content.content,
      nickname: content.nickname,
      together: Number(content.together)
  })).then((res)=>{
    alert('등록 완료!');
    console.log(res)
  })
};
  // const submitReview = ()=>{
  // axios({
  //   method: "post",
  //   url: "http://44.205.147.63:8080/api/board/join",
  //   data: {
  //    title: content.title,
  //       region: content.region,
  //       go_with_start: moment(date.start).format('YYYY-MM-DD'),
  //       go_with_end: moment(date.end).format('YYYY-MM-DD'),
  //       content: content.content,
  //       nickname: content.nickname,
  //       together:content.together
  //   }
  //  }).then((res) => {
  //   console.log(res.data);
  //  })
  // };

  const getValue = e => {
    const { name, value } = e.target;
      setContent({
        ...content,
        [name]: value
      })
      console.log(content);
  };

return(
    <div className="Acm">
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
            <Link to="/Login">LOGIN</Link>
            </div>
            <div className='joinheadermenu4'>
            <Link to="/Signup">JOIN</Link>
            </div>
            </div>
            </div>
            </div>
            </div>
            <Link to="/AcmList"></Link>
        <div className="jbwcontainer">
          {/* {viewContent.map(element => 
            <div>
              <div>
              {element.title}
                {ReactHtmlParser(element.content)}
              </div>
              </div>
              )} */}
        {/* <Drop1 selected={selected1} setSelected={setSelected1}/>
        <Drop2 selected={selected2} setSelected={setSelected2}/>
        <Drop3 selected={selected3} setSelected={setSelected3}/>
        <Drop4 selected={selected4} setSelected={setSelected4}/> */}
        <div className="jbw-input">
        <CalendarJoin
            start={date.start}
            end={date.end}
            handleDateChange={handleDateChange}
        />
        </div>
        <input className="jbwdata-input" type='text' placeholder="지역" onChange={getValue} name='region'/>
        <input className="jbwdata-input" type='text' placeholder="이름" onChange={getValue} name='nickname'/>
        <input className="jbwdata-input" type='number' placeholder="인원" onChange={getValue} name='together'/>
        <button className="jbwbutton" onClick={submitReview}>업로드</button>
        <input className="title-input" type='text' placeholder='제목' onChange={getValue} name='title'/>
        <div className="jbwtitleline"></div>
        <CKEditor
          editor={ClassicEditor}
          data=""
          placeholder="본문을 작성하세요."
          onReady={editor => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            setContent({
              ...content,
              content: data
            })
            console.log(content);
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />
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

// function Drop1({selected, setSelected}){
//   const [isActive, setIsActive] = useState(false);
//   const options = ['지역 1', '지역 2', '지역 3']
//   return(
//     <div className="dropdown1">
//           <div className="dropdown-btn" onClick={(e) =>
//           setIsActive(!isActive)}>
//             {selected}
//             <img src = {dropdown} width='39' height='39'/>
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

// function Drop2({selected, setSelected}){
//   const [isActive, setIsActive] = useState(false);
//   const options = ['일정 1', '일정 2', '일정 3']
//   return(
//     <div className="dropdown2">
//           <div className="dropdown-btn" onClick={(e) =>
//           setIsActive(!isActive)}>
//             {selected}
//             <img src = {dropdown} width='39' height='39'/>
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

// function Drop3({selected, setSelected}){
//   const [isActive, setIsActive] = useState(false);
//   const options = ['남', '여']
//   return(
//     <div className="dropdown2">
//           <div className="dropdown-btn" onClick={(e) =>
//           setIsActive(!isActive)}>
//             {selected}
//             <img src = {dropdown} width='39' height='39'/>
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

// function Drop4({selected, setSelected}){
//   const [isActive, setIsActive] = useState(false);
//   const options = ['1', '2', '3']
//   return(
//     <div className="dropdown3">
//           <div className="dropdown-btn" onClick={(e) =>
//           setIsActive(!isActive)}>
//             {selected}
//             <img src = {dropdown} width='39' height='39'/>
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
export default JoinBoardWrite;