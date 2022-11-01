import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed } from '@fortawesome/free-solid-svg-icons';

const CountNumbox = ({
  adult,
  room,
  incrAdultQty,
  decrAdultQty,
  incrRoomQty,
  decrRoomQty,
}) => {
  const [isToggleBox, setIsToggleBox] = useState(false);

  const handleToggleBox = () => {
    setIsToggleBox(!isToggleBox);
  };
  const closeToggleBox = () => {
    setIsToggleBox(false);
  };
  return (
    <>
      <SearchBox>
        <div onClick={handleToggleBox}>
          <span>
            {/* 성인 {adult}명 / 객실 {room}개 */}
            인원 {adult}명
          </span>
          <i className="fas fa-chevron-down rightDown" />
        </div>
        <SelectQty display={isToggleBox}>
          <SelectAdultTitle>인원선택</SelectAdultTitle>
          <SelectAdultNum>
            <Title>인원</Title>
            <CountBtn>
              <button onClick={decrAdultQty}>-</button>
              {adult}
              <button onClick={incrAdultQty}>+</button>
            </CountBtn>
          </SelectAdultNum>
          {/* <SelectAdultNum>
            <Title>객실</Title>
            <CountBtn>
              <button onClick={decrRoomQty}>-</button>
              {room}
              <button onClick={incrRoomQty}>+</button>
            </CountBtn>
          </SelectAdultNum> */}
          <UpdateBtn onClick={closeToggleBox}>적용하기</UpdateBtn>
        </SelectQty>
      </SearchBox>
    </>
  );
};

export default CountNumbox;

const SearchBox = styled.div`
  display: flex;
  float:left;S
  align-items: center;
  width: 380px;
  height: 60px;
  margin-right: 15px;
  // background-color: ${({ theme }) => theme.white};
  // border: 1px solid ${({ theme }) => theme.boxGray};
  
  border-radius: 5px;
  font-size: 16px;
  padding-left: 15px;
  cursor: pointer;
  .fa-bed {
    margin-right: 10px;
    font-size: 23px;
    color: ${({ theme }) => theme.mainColor};
  }
  .rightDown {
    margin-left: 70px;
    color: ${({ theme }) => theme.mainColor};
    font-size: 25px;
  }

  span {
    display: inline-block;
    width: 220px;
    margin-bottom: 10px;
    font-size: 30px;
    font-family:'Gowun Batang';
    margin-top:20px;
    color: ${({ theme }) => theme.fontGray};
  }
  &:hover {
    //border: 1.5px solid rgba(0, 0, 0, 0.1);
    //box-shadow: 0 4px 5px rgba(0, 0, 0, 0.15);
    //transition: box-shadow 0.3s ease-in-out;
  }
`;

const SelectQty = styled.div`
  position: absolute;
  display: ${props => (props.display ? 'flex' : 'none')};
  flex-direction: column;
  width: 350px;
  height: 260px;
  margin-top: 80px;
  padding: 20px;
  background-color: #FFFFFF;
  border: 1px solid #EBEBEB;
  border-radius: 4px;
  z-index: 20;
  font-size:25px;
`;

const SelectAdultTitle = styled.div`
  margin: 0px 0px 30px;
  font-size: 30px;
  font-weight: 700;
  color: #707070;
  font-family:'Gowun Batang';
  text-align: left;
`;

const SelectAdultNum = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  color: #333333;
  font-family:'Gowun Batang';
`;

const Title = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.fontGray};
  float:left;
  text-align: left;
  
`;

const CountBtn = styled.div`
  display: flex;
  align-items: center;
  button {
    background: none;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    text-align: center;
    border: 1px solid ${({ theme }) => theme.boxGray};
    color: ${({ theme }) => theme.mainColor};
    font-size: 20px;
    margin: 0px 10px;
    cursor: pointer;
    font-family:'Gowun Batang';
  }
`;

const UpdateBtn = styled.div`
  position: relative;
  text-align: right;
  border-radius: 5px;
  color: #333333;
  background-color: ${({ theme }) => theme.mainColor};
  width: 100px;
  padding: 10px;
  left: 190px;
  font-size: 20px;
  cursor: pointer;
  font-weight:700;
  font-family:'Gowun Batang';
`;
