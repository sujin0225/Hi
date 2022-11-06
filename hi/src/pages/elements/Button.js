import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    text,
    _onClick,
    children,
    margin,
    width,
    padding,
    bg,
    color,
    disabled,
    borderColor,
    size,
    bold,
  } = props;

  const styles = {
    margin: margin,
    width: width,
    padding: padding,
    bg: bg,
    color: color,
    borderColor: borderColor,
    size: size,
    bold: bold,
  };

  return (
    <React.Fragment>
      <BasicButton {...styles} onClick={_onClick} disabled={disabled}>
        {text ? text : children}
      </BasicButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  text: false,
  _onClick: () => {},
  children: null,
  margin: false,
  width: "100%",
  padding: "15px 15px",
  bg: "#5f0081",
  color: "white",
  disabled: false,
  borderColor: "1px solid #5f0081",
  size: "16px",
  bold: false,
};

const BasicButton = styled.button`
  // width: ${(props) => props.width};
  width:196px;
  height:61px;
  // float:left;
  font-family:'Noto Sans KR';
  // font-size:18px;
  // background-color:#FFFFFF;
  font-weight:300;
  // border: 3px solid #DCDCDC;
  // &:hover{
  //   background-color: #DCDCDC;
  //   color: black;
  //   transition : 0.5s;
  // }
  cursor: pointer;
  background-color: ${(props) => props.bg};
  color: ${(props) => props.color};
  padding: ${(props) => props.padding};
  border: ${(props) => props.borderColor};
  box-sizing: border-box;
  font-size: ${(props) => props.size};
  ${(props) => (props.margin ? `margin:${props.margin};` : "")}
  //${(props) => (props.bold ? "font-weight:400;" : "")}
  outline: none;
 &:focus {
   outline: none;
 }
 &:disabled {
   background-color: #ddd;
   border: 1px solid #ddd;
 }

`;

export default Button;
