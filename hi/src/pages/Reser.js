import "./Reser.css";
import plus from '../img/그림33.png'
import { useEffect, useRef, useState } from 'react';
import drop from '../img/그림9.png'
import check from '../img/그림8.png'


function Reser(){
  const [입력값, 입력값변경] = useState("");
  const options = ['카드1', '카드2']
  const [selected, setSelected] = useState("카드 선택");
  const [useCheck, setUseCheck] = useState(false);
  const [marketingCheck, setMarketingCheck] = useState(false);
  const [count, setCount] = useState(0);
  const [peoplecount, setPeopleCount] = useState(0);




  const handleQuantity = (type) => {
    if (type === "plus") {
      setCount(count + 1);
    } else {
      if (count === 0) return;
      setCount(count - 1);
    }
  };

  const PeoplehandleQuantity = (type) => {
    if (type === "plus") {
      setPeopleCount(peoplecount + 1);
    } else {
      if (peoplecount === 0) return;
      setPeopleCount(peoplecount - 1);
    }
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



return(
    <div className="Reser">
    <div className="resercontainer">
      <div className="resertit">예약</div>
    </div>
    <div className="reserbox1">
    <div className="resercontainer">
      <div className="reserboxtext">숙소</div>
      <div className="reserboxtext1">객실</div>
      <div className="reserboxtext1">날짜</div>
      <div className="reserboxtext2">하이파리 민박</div>
      <div className="reserboxtext3">2인실</div>
      <div className="reserboxtext3">2022.05.15 일 - 2022.05.16 월</div>
      </div>
    </div>
    <div className="resercontainer">
      <div className="resertext1">하이파리 민박</div>
      <div className="resertext2">2인실</div>
      <div className="reserline"></div>
      <div className="resertext3">조식 추가</div>
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
      </div>
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
      <input placeholder="숙소 이용 시 문의하실 사항이 있으시면 입력해 주세요." onChange={()=> {}}></input>
      </div>
      <div className="resertotalbox">
        <div className="resertotal">2022.05.15</div>
        <div className="resertotal1">{54900 + 40000 * peoplecount}</div>
        <div className="resertotal2">조식 추가</div>
        <div className="resertotal3">{20000 * count}</div>
        <div className="resertotalline"></div>
        <div className="resertotal4">총 예약금액</div>
        <div className="resertotal5">{54900 + 40000 * peoplecount + 20000 * count}원</div>
      </div>
      <div className="resertotalbutton">예약 완료</div>
      
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

function Dropdown({selected, setSelected}){
  const [isActive, setIsActive] = useState(false);
  const options = ['카드 1', '카드 2', '카드 3']
  return(
    <div className="dropdown">
          <div className="dropdown-btn" onClick={(e) =>
          setIsActive(!isActive)}>
            {selected}
            <img src = {drop} width='39' height='39'/>
            </div>
          {isActive && (
            <div className="dropdown-content">
              {options.map((option) => (
                <div 
                onClick={(e) => {
                  setSelected(option);
                  setIsActive(false);
                }}
            className="dropdown-item">
              {option}
            </div>
              ))}
              
          </div>
          )}
          
        </div>
  )
}

export default Reser;