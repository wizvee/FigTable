import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';
import { FiPlusCircle } from 'react-icons/Fi';
import { IoIosCloseCircleOutline } from 'react-icons/io';
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
  margin-left: 0.5rem;
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

  &:hover {
    opacity: 0.8;
  }
`;

const IconWrapper = styled.div`
  display: block;
  bottom: 0;
  width: 100%;
  margin-top: 20px;
  text-align: center;
  font-size: 30px;
  color: ${palette.textGray};
  svg:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
  text-align: center;

  svg {
    font-size: 25px;
    margin-top: 8px;
    margin-left: 8px;
    color: #fa5252;
    opacity: 0.7;
    &:hover {
      opacity: 1;
      cursor: pointer;
    }
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
    tel,
    owner,
    operation,
    menu,
  } = store;
  const [addOp, setAddOp] = useState(operation);
  const [addMn, setAddMn] = useState(menu);

  const appendInput = e => {
    e.target.getAttribute('name') == 'oper'
      ? setAddOp(addOp.concat({ openDay: '', closeTime: '' }))
      : setAddMn(addMn.concat({ title: '', price: '' }));
  };

  const operationChange = ({ target }, index) => {
    setAddOp(
      addOp.map((op, i) => {
        if (i === index) {
          return { ...op, [target.name]: target.value };
        }
        return op;
      }),
    );
  };

  const menuChange = ({ target }, index) => {
    setAddMn(
      addMn.map((m, i) => {
        if (i === index) {
          return { ...m, [target.name]: target.value };
        }
        return m;
      }),
    );
  };

  const onChange = e => {
    const { value, name } = e.target;
  };

  const opRemove = index => {
    setAddOp(addOp.filter((o, i) => i !== index));
  };

  const mnRemove = index => {
    setAddMn(addMn.filter((o, i) => i !== index));
  };

  return (
    <>
      <FormContainer padding="20px">
        <SubTitle>가게정보</SubTitle>
        <StyledInput
          type="text"
          name="resName"
          placeholder="매장명"
          onChange={onChange}
          defaultValue={shopName}
        />
        <StyledInput
          type="text"
          name="resAddr"
          placeholder="매장 주소"
          onChange={onChange}
          defaultValue={addr}
        />
        <StyledInput
          type="tel"
          name="resTel"
          placeholder="매장 전화번호"
          onChange={onChange}
          defaultValue={tel}
        />
        <StyledInput
          type="text"
          name="resAdminName"
          placeholder="대표자명"
          onChange={onChange}
          defaultValue={owner}
        />
        <StyledInput
          type="text"
          name="resLocationKeyword"
          placeholder="위치 키워드"
          onChange={onChange}
          defaultValue={locationKeyword}
        />
        <StyledInput
          type="text"
          name="resFoodKeyword"
          placeholder="음식 키워드"
          onChange={onChange}
          defaultValue={foodKeyword}
        />
        <br />
      </FormContainer>
      <FormContainer padding="5px">
        <SubTitle>영업시간</SubTitle>
        {addOp.map((op, index) => (
          <InputWrapper key={index} style={{ marginTop: '0.5rem' }}>
            <StyledTextArea
              style={{ width: '20%' }}
              type="textArea"
              name="openDay"
              placeholder="영업일"
              value={addOp[index].openDay}
              onChange={() => operationChange(event, index)}
            />
            <StyledTextArea
              style={{ width: '65%' }}
              type="textArea"
              name="closeTime"
              placeholder="운영시간"
              value={addOp[index].closeTime}
              onChange={() => operationChange(event, index)}
            />
            <IoIosCloseCircleOutline
              name="op"
              onClick={() => opRemove(index)}
            />
          </InputWrapper>
        ))}
        <IconWrapper>
          <FiPlusCircle name="oper" onClick={appendInput} />
        </IconWrapper>
      </FormContainer>
      <FormContainer padding="5px">
        <SubTitle>메뉴</SubTitle>
        {addMn.map((m, index) => (
          <InputWrapper key={index} style={{ marginTop: '0.5rem' }}>
            <StyledTextArea
              type="textArea"
              name="title"
              placeholder="메뉴"
              style={{ width: '40%' }}
              onChange={() => menuChange(event, index)}
              value={addMn[index].title}
            />
            <StyledTextArea
              type="textArea"
              name="price"
              placeholder="가격"
              style={{ width: '40%', marginRight: '10px' }}
              onChange={() => menuChange(event, index)}
              value={addMn[index].price}
            />
            <IoIosCloseCircleOutline
              name="m"
              index={index}
              onClick={() => mnRemove(index)}
            />
          </InputWrapper>
        ))}
        <IconWrapper>
          <FiPlusCircle name="m" onClick={appendInput} />
        </IconWrapper>
      </FormContainer>

      <StyledButton type="button" value="수정" />
    </>
  );
};

export default OwnerShopForm;
