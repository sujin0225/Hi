import { useEffect, useRef, useState } from 'react';
import "./AcmList.css";
import lodging from '../img/숙소.png'
import axios from 'axios';
import acmlistdata from './acmlistdata';
import { Routes, Route, Link, useParams } from 'react-router-dom'
import Posts from './Posts';

function AcmList(){


// export const AcmList = ({ products, setProducts }) => {
//   useEffect(() => {
//     axios.get('http://3.34.183.59:8080/accommodation/list').then((data) => {
//       setProducts(data.data.products);
//     });
//   }, [setProducts]);

  const [selected, setSelected] = useState(null)
  const toggle = (i) => {
      if(selected === i){
          return setSelected(null)
      }
      setSelected(i)
  }


  let [listdata] = useState(acmlistdata)
  let [lodging, setlodging] = useState(['하이파리 민박', '파리 퐁피두 민박', '파리 해바라기 민박', '파리 미래하우스', '꽃보다 파리 한인민박', '파리 제이민박', '프랑스 파리']);
  let [입력값, 입력값변경] = useState('');
  const [acmlist, setAcmlist] = useState([]);
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage, setPostsPerPage] = useState(10);

  const {id} = useParams();
  // const [products, setProducts] = useState({});


  useEffect(() => {
    axios({
      method:'GET',
      url:'http://3.34.183.59:8080/accommodation/list'
    }).then(response => setAcmlist(response.data))
  })


  


  // const AcmList = ({ acmlist, loading }) => {
  //   return(
  //     <>
  //     {loading && <div> loading... </div>}
  //     <ul>
  //       {acmlist.map((AcmList) => (
  //         <li key={AcmList.id}>{AcmList.title}</li>
  //       ))}
  //     </ul>
  //     </>
  //   )
  // }
 

  return(
    
    <div className="AcmMain">
      <div className="container"> 
      <div className='box'>
          <div className="search">
            <div className="search1">
            <input placeholder="도시, 숙소" onChange={(e)=> { 입력값변경(e.target.value);}}></input>
            </div>
            <div className='checkin'>
            <input type="date"data-placeholder="CHECK IN" required aria-required="ture"></input>
            </div>
            <div className='checkout'>
            <input type="date"data-placeholder="CHECK OUT" required aria-required="ture"></input>
          </div>
          <div className="guest1">
            <input placeholder="게스트 추가" onChange={(e)=> { 입력값변경(e.target.value);}}></input>
            </div>
            <input className="button0" id="button" type="submit" onClick={()=>{
              //.get('https://codingapple1.github.io/shop/data2.json').then((data)=>{
                //console.log(data)
              //})
            }} value={"SEARCH"} ></input>
      </div>
        </div>  
        <div className='accordion'>
        {data.map((item, i) => (
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
          {
            // [0].map((a, i) => {
            //   return (
            //   <Card lodging={lodging}></Card>
            //   )
            // })
          }
    {/* {
    acmlist.map(Acmlist => (
      <div className='AcmMain'>
      <Link to="/Acm/:id"> 
      <div key={Acmlist.id} />
      <img src = {lodging} width='450' height='370'/>
      <div className='lodgingtitle'>{acmlist.nameKor}</div>
      <div className='lodgingcontent'>{acmlist.address}</div>
     </Link> 
      </div>
    ))} */}
  
  
   

    {/* {
      [0,1,2,3,4,5].map(AcmList => {
        return (
          <div className='lodgingtitle' key={AcmList.id}>
            <Link to="/Acm/:id">
           <img src = {lodging} width='450' height='370'/>
           <div className='lodgingtitle'>{AcmList.nameKor}</div>
           <div className='lodgingcontent'>{AcmList.address}</div>
          </Link>
              
              </div>
        )
      })
} */}

{/* {
acmlist.map((a, i) => (
      <div key={AcmList.id}>

      {AcmList.nameKor}</div>
    )
  )
} */}



    <div className='AcmMain'>
        {/* <div className='lodgingbox1'> */}
       {
        
     acmlist.slice(0, 6).map((a, i) => {
          return (
            <Card acmlist={acmlist[i]} key={i}></Card>
          )
        })
       }
        <input className="morebutton" id="morebutton" type="button" onClick={()=>{
            axios.get('http://3.34.183.59:8080/accommodation/list')
            .then((결과)=>{ 
             console.log(결과.data)
             console.log(acmlist)
             let copy = [...acmlist, 결과.data];
             acmlist(copy);
            })
            
        }} value={"더보기"}></input>
       
         {/* <Link to="/Acm/:id">
           <img src = {lodging} width='450' height='370'/>
           <div className='lodgingtitle'>{acmlist[0].nameKor}</div>
           <div className='lodgingcontent'>{acmlist[0].address}</div>
          </Link>
         </div>
         <div className='lodgingbox2'>
         <Link to="/Acm/:id">
           <img src = {lodging} width='450' height='370'/>
           <div className='lodgingtitle'>{acmlist[1].nameKor}</div>
           <div className='lodgingcontent'>{lodging[6]}</div>
           </Link>
           </div>
         <div className='lodgingbox3'>
         <Link to="/Acm/:id">
           <img src = {lodging} width='450' height='370'/>
           <div className='lodgingtitle'>{acmlist[2].nameKor}</div>
           <div className='lodgingcontent'>{lodging[6]}</div>
           </Link>
           </div>
         <div className='lodgingbox4'>
         <Link to="/Acm/:id">
           <img src = {lodging} width='450' height='370'/>
           <div className='lodgingtitle'>{acmlist[3].nameKor}</div>
           <div className='lodgingcontent'>{lodging[6]}</div>
          </Link>
           </div>
         <div className='lodgingbox3'>
         <Link to="/Acm/:id">
           <img src = {lodging} width='450' height='370'/>
          <div className='lodgingtitle'>{acmlist[4].nameKor}</div>
         <div className='lodgingcontent'>{lodging[6]}</div>
           </Link>
           </div>
         <div className='lodgingbox4'>
         <Link to="/Acm/:id">
           <img src = {lodging} width='450' height='370'/>
           <div className='lodgingtitle'>{acmlist[5].nameKor}</div>
           <div className='lodgingcontent'>{lodging[6]}</div>
           </Link>
          </div> */}
          </div>




        <div className='interval'></div> 
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

const data = [
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

// function Card(props){
//   return (
//     <div className='AcmMain'>
//         <div className='lodgingbox1'>
//         <Link to="/Acm/:id">
//           <img src = {lodging} width='450' height='370'/>
//           <div className='lodgingtitle'>{props.acmlist.nameKor}</div>
//           <div className='lodgingcontent'>{props.acmlist.nameKor}</div>
//          </Link>
//          </div>
//         <div className='lodgingbox2'>
//         <Link to="/Acm/:id">
//           <img src = {lodging} width='450' height='370'/>
//           <div className='lodgingtitle'>{props.acmlist.nameKor}</div>
//           <div className='lodgingcontent'>{props.acmlist.nameKor}</div>
//           </Link>
//           </div>
//         <div className='lodgingbox3'>
//         <Link to="/Acm/:id">
//           <img src = {lodging} width='450' height='370'/>
//           <div className='lodgingtitle'>{props.acmlist.nameKor}</div>
//           <div className='lodgingcontent'>{props.acmlist.nameKor}</div>
//           </Link>
//           </div>
//         <div className='lodgingbox4'>
//         <Link to="/Acm/:id">
//           <img src = {lodging} width='450' height='370'/>
//           <div className='lodgingtitle'>{props.acmlist.nameKor}</div>
//           <div className='lodgingcontent'>{props.acmlist.nameKor}</div>
//           </Link>
//           </div>
//         <div className='lodgingbox3'>
//         <Link to="/Acm/:id">
//           <img src = {lodging} width='450' height='370'/>
//           <div className='lodgingtitle'>{props.acmlist.nameKor}</div>
//           <div className='lodgingcontent'>{props.acmlist.nameKor}</div>
//           </Link>
//           </div>
//         <div className='lodgingbox4'>
//         <Link to="/Acm/:id">
//           <img src = {lodging} width='450' height='370'/>
//           <div className='lodgingtitle'>{props.acmlist.nameKor}</div>
//           <div className='lodgingcontent'>{props.acmlist.nameKor}</div>
//           </Link>
//          </div>
//         </div>
//   )
// }


function Card(props){
  return (
    <div className='AcmMain'>
        <div className='lodgingbox2'>
        <Link to={`/Acm/${props.acmlist.id}`}>
          <img src = {lodging} width='450' height='370'/>
          <div className='lodgingtitle'>{props.acmlist.nameKor}</div>
          <div className='lodgingcontent'>{props.acmlist.address}</div>
          <div className='lodgingcontent1'>{props.acmlist.priceKor}원~</div>
         </Link>
         </div>
        
        
        {/* <div className='lodgingbox2'>
        <Link to="/Acm/:id">
          <img src = {lodging} width='450' height='370'/>
          <div className='lodgingtitle'>{props.acmlist.nameKor}</div>
          <div className='lodgingcontent'>{props.acmlist.address}</div>
          </Link>
          </div> */}
        {/* <div className='lodgingbox3'>
        <Link to="/Acm/:id">
          <img src = {lodging} width='450' height='370'/>
          <div className='lodgingtitle'>{props.acmlist.nameKor}</div>
          <div className='lodgingcontent'>{props.acmlist.nameKor}</div>
          </Link>
          </div>
        <div className='lodgingbox4'>
        <Link to="/Acm/:id">
          <img src = {lodging} width='450' height='370'/>
          <div className='lodgingtitle'>{props.acmlist.nameKor}</div>
          <div className='lodgingcontent'>{props.acmlist.nameKor}</div>
          </Link>
          </div>
        <div className='lodgingbox3'>
        <Link to="/Acm/:id">
          <img src = {lodging} width='450' height='370'/>
          <div className='lodgingtitle'>{props.acmlist.nameKor}</div>
          <div className='lodgingcontent'>{props.acmlist.nameKor}</div>
          </Link>
          </div>
        <div className='lodgingbox4'>
        <Link to="/Acm/:id">
          <img src = {lodging} width='450' height='370'/>
          <div className='lodgingtitle'>{props.acmlist.nameKor}</div>
          <div className='lodgingcontent'>{props.acmlist.nameKor}</div>
          </Link>
         </div> */}
        </div>
  )
}


export default AcmList;