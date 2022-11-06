// 아이디 형식: 최소 6자 이상, 알파벳 소문자(a~z), 숫자(0~9)를 포함
export const usernameCheck = (username) => {
  let _reg = /^(?!(?:[0-9]+)$)([a-zA-Z]|[0-9a-zA-Z]){6,}$/;
  return _reg.test(username);
};

//비번: 10자 이상, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자
export const pwdCheck = (pwd) => {
  let _reg =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/;

  return _reg.test(pwd);
};

// 닉네임 형식: 한글 또는 알파벳 대소문자(a~z, A~Z)
export const nicknameCheck = (nickname) => {
  let _reg = /^[가-힣a-zA-Z]+$/;
  return _reg.test(nickname);
};

// 이메일 형식
export const emailCheck = (email) => {
  let _reg =
    /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
  return _reg.test(email);
};

// 전화번호 형식
export const phoneNumberCheck = (phoneNumber) => {
  let _reg =
  /^[0-9]+$/;
  return _reg.test(phoneNumber);
}

// 우편번호 형식
export const postcodeCheck = (postcode) => {
  let _reg =
  /^[0-9]{5,5}$/;
  return _reg.test(postcode);
}

//주소 형식
export const addressCheck = (address) => {
  let _reg = /^[가-힣 a-zA-Z 0-9]+$/;
  return _reg.test(address);
}

//상세 주소 형식
export const detailedAddressCheck = (detailedAddress) => {
  let _reg = /^[가-힣 a-zA-Z 0-9]+$/;
  return _reg.test(detailedAddress);
}

//이름 (성)형식
export const lastNameKorCheck = (lastNameKor) => {
  let _reg = /^[가-힣]+$/;
  return _reg.test(lastNameKor);
}

//이름 형식
export const firstNameKorCheck = (firstNameKor) => {
  let _reg = /^[가-힣]+$/;
  return _reg.test(firstNameKor);
}

//영문 이름(성) 형식
export const lastNameEngCheck = (lastNameEng) => {
  let _reg = /^[a-zA-Z]+$/;
  return _reg.test(lastNameEng);
}

//영문 이름 형식
export const firstNameEngCheck = (firstNameEng) => {
  let _reg = /^[a-zA-Z]+$/;
  return _reg.test(firstNameEng);
}

//성별 형식
export const genderCheck = (gender) => {
  let _reg = /^[A-Z]{4,6}$/;
  return _reg.test(gender);
}

