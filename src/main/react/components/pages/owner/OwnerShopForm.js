import React from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';

const FormContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
  padding-bottom: 20px;
  margin-top: 20px;
  background: white;
  box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
`;

const SubTitle = styled.div`
  z-index: 3;
  padding-top: 20px;
  margin-left: 25px;
  font-weight: 900;
  font-size: 20px;
`;

const StyledInput = styled.input`
  padding: 0.5rem 0.8rem;
  width: 70%;
  float: right;
  margin-right: 30px;
  border-radius: 5px;
  border: 1px solid ${palette.borderGray};
  font-size: 1rem;
  outline: none;
  & + & {
    margin-top: 0.5rem;
  }
`;

const OwnerShopForm = ({ store }) => {
  const {
    shopName,
    imgUrl,
    addr,
    foodKeyword,
    locationKeyword,
    view,
    reviewCount,
    star,
  } = store;
  {
    console.log(store);
  }
  return (
    <>
      <FormContainer>
        <SubTitle>가게정보</SubTitle>
        <StyledInput
          type="text"
          name="resName"
          placeholder="매장명"
          value={shopName}
        />
        <StyledInput
          type="text"
          name="resAddr"
          placeholder="매장 주소"
          value={addr}
        />
        <StyledInput type="tel" name="resTel" placeholder="매장 전화번호" />
        <StyledInput type="text" name="resAdminName" placeholder="대표자명" />
        <StyledInput
          type="text"
          name="resLocationKeyword"
          placeholder="위치 키워드"
          value={locationKeyword}
        />
        <StyledInput
          type="text"
          name="resFoodKeyword"
          placeholder="음식 키워드"
          value={foodKeyword}
        />
        <br />
      </FormContainer>
      <FormContainer>
        <SubTitle>영업시간</SubTitle>
        <StyledInput type="text" name="resOpenDay" placeholder="영업일" />
        <StyledInput type="text" name="resCloseTime" placeholder="운영시간" />
        <br />
      </FormContainer>
      <FormContainer>
        <SubTitle>메뉴</SubTitle>
        <StyledInput type="text" name="resMenuTitle" placeholder="메뉴" />
        <StyledInput type="text" name="resMenuPrice" placeholder="메뉴 가격" />
      </FormContainer>
    </>
  );
};

export default OwnerShopForm;
