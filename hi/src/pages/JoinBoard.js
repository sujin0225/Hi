import './JoinBoard.css';
import { useEffect , useState } from 'react';
import good from '../img/그림3.png'
import Scrap from '../img/그림22.png'
import share from '../img/그림23.png'
import joinphoto from '../img/1.png'
import arrow from '../img/그림26.png'
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import Text1 from "../pages/elements/Text1";
import { actionCreators } from "../pages/redux/modules/user";
import { getCookie } from "../pages/shared/Cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

function JoinBoard(){

window.scrollTo(0,0);

const { id } = useParams();
const [data, setData] = useState([]); 
const [comdata, setComData] = useState([]); 
const [replydata, setReplyData] = useState([]); 
const navigate = useNavigate();

useEffect(() => {
    axios.get(`/api/board/join/${id}`)
    .then(res => setData(res.data.board))
  },[]);

useEffect(() => {
    axios.get(`/api/board/join/${id}`)
    .then(res => setComData(res.data.comments))
  },[]);  

  useEffect(() => {
    axios.get(`/api/board/join/${id}`)
    .then(res => setReplyData(res.data.comments[0].reply))
  },[]);    

// useEffect(() => {
//     axios.get(`/api/board/join/${id}`)
//     .then(res => setReplyData(res.data))
//   },[]);  

   
const is_login = getCookie("is_login");
    const is_token = getCookie("Authorization");

    const dispatch = useDispatch();

    if (is_login && is_token) {
      const username = getCookie("username");
    return(
        <div className="JoinBoard">
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
                <div className='joinboardtitle'>
                    {data.title}
                </div>
                <div className='joinboarddate'>
                    {data.created_at}
                </div>
                <div className='joinboardline'></div>
                <div className='joinboardbutton1'><img src = {good} width='21' height='21' margin-left='8' />좋아요</div> 
                <div className='joinboardbutton2'><img src = {Scrap} width='21' height='21' margin-left='8'/>스크랩</div> 
                <div className='joinboardbutton2'><img src = {share} width='16' height='17' margin-left='8'/>공유</div> 
                <div className='joinboardtextbox1'>
                <div className='joinboardtextbold1'>
                    도시
                </div>
                <div className='joinboardtextbold2'>
                    동행기간
                </div>
                <div className='joinboardtextbold2'>
                    작성자
                </div>
                <div className='joinboardtextbold2'>
                    모집인원
                </div>
                <div className='joinboardtextbold2'>
                    성별
                </div>
                </div>
                <div className='joinboardtextbox2'>
                <div className='joinboardtext1'>
                {data.region}
                    </div>
                    <div className='joinboardtext2'>
                    {data.go_with_start}{" "}~{" "}{data.go_with_end}
                </div>
                <div className='joinboardtext3'>
                    {data.nickname}
                </div>
                <div className='joinboardtext3'>
                    {data.together}명
                </div>
                <div className='joinboardtext4'>
                    {data.gender}
                </div>
                </div>
                <div className='joinboardbox1'></div>
                {/* <img src = {joinphoto}/> */}
                <div className='joinboardbox2'></div>
                <div className='joinboardmaintext1'>{data.content}</div>
    {comdata.map((item,i) => {
        return (
         <div className='JoinBoard'>
            <div className='joinboardline'></div>
            <div className='joinboardcombox'>
            <div className='joinboardcom1'>{item.nickname}</div>
            <div className='joinboardcom3'>{item.created_at}</div>
            <div className='joinboardcom2'>{item.content}</div>
            </div>
         </div>
          
        )
      })}
    {replydata.map((item,i) => {
        return (
         <div className='JoinBoard'>
            <div className='joinboardline'></div>
            <div className='joinboardcombox1'>
            <div className='joinboardcombox2'>
            <div className='joinboardcom1'>{item.nickname}</div>
            <div className='joinboardcom3'>{item.created_at}</div>
            <div className='joinboardcom2'>{item.content}
                </div>
            </div>
            </div>
         </div>
        )
      })}

                <div className='joinboardline1'></div>
                <div className='joinboardcombox3'>
                <div className='joinboardcommand'>
                <input placeholder="댓글을 입력하세요" onChange={()=> {}}></input>
                </div>
                </div>
                <div className='joinboardbutton'>저장</div>
                <div className='joinboardbox2'></div>
            </div>
           <div className='gap'></div>
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
    <div className="JoinBoard">
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
            <div className='joinboardtitle'>
                {data.title}
            </div>
            <div className='joinboarddate'>
                {data.created_at}
            </div>
            <div className='joinboardline'></div>
            <div className='joinboardbutton1'><img src = {good} width='21' height='21' margin-left='8' />좋아요</div> 
            <div className='joinboardbutton2'><img src = {Scrap} width='21' height='21' margin-left='8'/>스크랩</div> 
            <div className='joinboardbutton2'><img src = {share} width='16' height='17' margin-left='8'/>공유</div> 
            <div className='joinboardtextbox1'>
            <div className='joinboardtextbold1'>
                도시
            </div>
            <div className='joinboardtextbold2'>
                동행기간
            </div>
            <div className='joinboardtextbold2'>
                작성자
            </div>
            <div className='joinboardtextbold2'>
                모집인원
            </div>
            <div className='joinboardtextbold2'>
                성별
            </div>
            </div>
            <div className='joinboardtextbox2'>
            <div className='joinboardtext1'>
            {data.region}
                </div>
                <div className='joinboardtext2'>
                {data.go_with_start}{" "}~{" "}{data.go_with_end}
            </div>
            <div className='joinboardtext3'>
                {data.nickname}
            </div>
            <div className='joinboardtext3'>
                {data.together}명
            </div>
            <div className='joinboardtext4'>
                {data.gender}
            </div>
            </div>
            <div className='joinboardbox1'></div>
            {/* <img src = {joinphoto}/> */}
            <div className='joinboardbox2'></div>
            <div className='joinboardmaintext1'>{data.content}</div>
{comdata.map((item,i) => {
    return (
     <div className='JoinBoard'>
        <div className='joinboardline'></div>
        <div className='joinboardcombox'>
        <div className='joinboardcom1'>{item.nickname}</div>
        <div className='joinboardcom3'>{item.created_at}</div>
        <div className='joinboardcom2'>{item.content}</div>
        </div>
     </div>
      
    )
  })}
{replydata.map((item,i) => {
    return (
     <div className='JoinBoard'>
        <div className='joinboardline'></div>
        <div className='joinboardcombox1'>
        <div className='joinboardcombox2'>
        <div className='joinboardcom1'>{item.nickname}</div>
        <div className='joinboardcom3'>{item.created_at}</div>
        <div className='joinboardcom2'>{item.content}
            </div>
        </div>
        </div>
     </div>
    )
  })}

            <div className='joinboardline1'></div>
            <div className='joinboardcombox3'>
            <div className='joinboardcommand'>
            <input placeholder="댓글을 입력하세요" onChange={()=> {}}></input>
            </div>
            </div>
            <div className='joinboardbutton'>저장</div>
            <div className='joinboardbox2'></div>
        </div>
       <div className='gap'></div>
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

export default JoinBoard;