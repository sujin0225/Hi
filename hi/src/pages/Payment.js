import "./Payment.css";


function Payment(){

return(
    <div className="Payment">
        <div className="paymentcontainer">
    <div className="paymenttitle">예약이 완료되었습니다</div>
    </div>
    <div className="paymentbox">
      <div className="paymentcontainer">
      <div className="paymentboxtext1">예약 코드</div>
      <div className="paymentboxtext2">숙소</div>
      <div className="paymentboxtext5">객실</div>
      <div className="paymentboxtext5">날짜</div>
      <div className="paymentboxtext3">235436</div>
      <div className="paymentboxtext4">하이파리 민박</div>
      <div className="paymentboxtext4">2인실</div>
      <div className="paymentboxtext4">2022.05.15 일</div>
    </div>
    </div>
    <div className="paymentcontainer">
    <div className="paymentlinebox1">
        <div className="paymentlinebox2">
          <div className="paymentlinetext1">2022.05.15</div>
        </div>
        <div className="paymentlinebox3"></div>
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

export default Payment;