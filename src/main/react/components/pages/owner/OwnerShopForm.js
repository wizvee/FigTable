import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';
import { FiPlusCircle } from 'react-icons/Fi';
import TextareaAutosize from 'react-textarea-autosize';

const FormContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
  display: relative;
  padding-bottom: ${props => props.padding};
  margin-top: 20px;
  background: white;
  box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
`;

const SubTitle = styled.div`
  z-index: 3;
  padding-top: 20px;
  margin-left: 25px;
  padding-bottom: 20px;
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

const StyledTextArea = styled(TextareaAutosize)`
  @font-face {
    font-family: 'NanumSquareRound';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NanumSquareRound.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }
  padding: 0.5rem 0.8rem;
  width: 95%;
  border: 1px solid ${palette.borderGray};
  resize: none;
  border-radius: 5px;
  font-size: 1rem;
  font-family: 'NanumSquareRound';
  outline: none;
  vertical-align: top;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: transparent;
  }

  &:hover {
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: ${palette.textGray};
      border-radius: 10px;
    }
  }
  & + & {
    margin-top: 0.5rem;
  }

  @media (max-width) {
    width: 95%;
  }
`;

const StyledButton = styled.input`
  width: 140px;
  height: 40px;
  font-weight: 900;
  font-size: 20px;
  float: right;
  margin-top: 19px;
  margin-right: 23px;
  border-radius: 5px;
  background: #f67280;
  color: white;
`;

const IconWrapper = styled.div`
  display: block;
  bottom: 0;
  width: 100%;
  margin-top: 20px;
  text-align: center;
  font-size: 30px;
  color: ${palette.textGray};
`;

const InputWrapper = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
  text-align: center;
`;

const InnerLeft = styled.div`
  width: 15%;
  height: auto;
  margin-left: 23px;
  overflow: hidden;
  float: left;
  text-align: right;
`;

const InnerRight = styled.div`
  width: 80%;
  height: auto;
  overflow: hidden;
  text-align: left;
  float: right;
`;

const LeftMenu = styled.div`
  width: 48%;
  height: auto;
  overflow: hidden;
  float: left;
  text-align: center;
  margin-left: 20px;
`;
const RightMenu = styled.div`
  width: 48%;
  height: auto;
  overflow: hidden;
  float: right;
  text-align: left;
  margin-right: 0px;
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
    tel,
    owner,
    operation,
  } = store;

  // const [openday, setOpenday] = useState({ openDay });
  // {
  //   console.log(openday);
  // }
  // const appendInput = (operation) => {
  //   const open = '';
  //   setOpenday(operation.concat(''));
  //   console.log(openDay);
  // };

  return (
    <>
      <FormContainer padding="20px">
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
        <StyledInput
          type="tel"
          name="resTel"
          placeholder="매장 전화번호"
          value={tel}
        />
        <StyledInput
          type="text"
          name="resAdminName"
          placeholder="대표자명"
          value={owner}
        />
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
      <FormContainer padding="5px">
        <SubTitle>영업시간</SubTitle>
        <InputWrapper>
          <StyledTextArea
            style={{ width: '20%' }}
            type="textArea"
            name="resOpenDay"
            placeholder="영업일"
            defaultValue={open}
          />
          <StyledTextArea
            style={{ width: '65%' }}
            type="textArea"
            name="resCloseTime"
            placeholder="운영시간"
            defaultValue={close}
          />
        </InputWrapper>
        <IconWrapper>
          <FiPlusCircle />
        </IconWrapper>
      </FormContainer>
      <FormContainer padding="5px">
        <SubTitle>메뉴</SubTitle>
        <InputWrapper>
          <LeftMenu>
            <StyledTextArea
              type="textArea"
              name="resMenuTitle"
              placeholder="메뉴"
              style={{ width: '85%' }}
            />
          </LeftMenu>
          <RightMenu>
            <StyledTextArea
              type="textArea"
              name="resMenuPrice"
              placeholder="메뉴 가격"
              style={{ width: '85%' }}
            />
          </RightMenu>
        </InputWrapper>
        <IconWrapper>
          <FiPlusCircle />
        </IconWrapper>
      </FormContainer>

      <StyledButton type="button" value="수정" />
    </>
  );
};

export default OwnerShopForm;
