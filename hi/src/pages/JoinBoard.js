import './JoinBoard.css';
import { useEffect , useState } from 'react';
import good from '../img/그림3.png'
import Scrap from '../img/그림22.png'
import share from '../img/그림23.png'
import joinphoto from '../img/1.png'
import arrow from '../img/그림26.png'

function JoinBoard(){

window.scrollTo(0,0);

let [JoinBoardTitle] = useState(['파리 여행하시는 분 계신가요?']);
let [joinboarddate] = useState(['2022.05.13 오후 10시 49분']);
let [joinboardtitletext] = useState(['프랑스파리','2022-05-05 ~ 2022-05-19','배고프다','4명','여']);
let [jointext] = useState(['파리에 2주동안 있을 예정입니다','혼자 있으면 심심해서 같이 식사하고 사진 찍어주실 수 있는 분 구해요~~~!'])

    return(
        <div className="JoinBoard">
            <div className="container">
                <div className='joinboardtitle'>
                    {JoinBoardTitle[0]}
                </div>
                <div className='joinboarddate'>
                    {joinboarddate[0]}
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
                    {joinboardtitletext[0]}
                    </div>
                    <div className='joinboardtext2'>
                    {joinboardtitletext[1]}
                </div>
                <div className='joinboardtext3'>
                    {joinboardtitletext[2]}
                </div>
                <div className='joinboardtext3'>
                    {joinboardtitletext[3]}
                </div>
                <div className='joinboardtext4'>
                    {joinboardtitletext[4]}
                </div>
                </div>

                <div className='joinboardbox1'></div>
                <img src = {joinphoto}/>
                <div className='joinboardbox2'></div>
                <div className='joinboardmaintext1'>{jointext[0]}</div>
                <div className='joinboardmaintext2'>{jointext[1]}</div>
                <div className='joinboardline'></div>
                <div className='joinboardcombox'>
                <div className='joinboardcom1'>튜브</div>
                <div className='joinboardcom2'>와 동행 참여하고 싶어요!~</div>
                </div>
                <div className='joinboardline'></div>
                <div className='joinboardcombox1'>
                <div className='joinboardcombox2'>
                <div className='joinboardcom1'>배고프다</div>
                <div className='joinboardcom2'>네 알겠습니다~~~~~</div>
                </div></div>
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