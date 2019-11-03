import React from 'react';
import styled from 'styled-components';
import Button from '../../../lib/styles/Button';
import palette from '../../../lib/styles/Palette';
import Responsive from '../../common/Responsive';

const FormBlock = styled(Responsive)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  position: relative;
  height: 35rem;
  margin-top: -1rem;
  form {
    width: 290px;
  }
`;

const StyledInput = styled.input`
  padding: 0.5rem 0.8rem;
  width: 100%;
  border-radius: 5px;
  border: 1px solid ${palette.borderGray};
  font-size: 1rem;
  outline: none;
  & + & {
    margin-top: 0.5rem;
  }
`;

const StyledButton = styled(Button)`
  margin-top: 0.5rem;
  padding: 0.5rem;
`;

const ErrorMsg = styled.div`
  margin-top: 1rem;
  width: 100%;
  color: red;
  text-align: center;
  font-size: 1rem;
`;

const InsertResForm = ({ form, res, onSubmit, onChange, error }) => {
  return (
    <>
      <FormBlock>
        <form onSubmit={onSubmit}>
          <StyledInput
            type="text"
            name="resName"
            placeholder="매장명"
            onChange={onChange}
          />
          <StyledInput
            type="text"
            name="resAddr"
            placeholder="매장 주소"
            onChange={onChange}
          />
          <StyledInput
            type="tel"
            name="resTel"
            placeholder="매장 전화번호"
            onChange={onChange}
          />
          <StyledInput
            type="text"
            name="resAdminName"
            placeholder="대표자명"
            onChange={onChange}
          />
          <StyledInput
            type="text"
            name="resLocationKeyword"
            placeholder="위치 키워드"
            onChange={onChange}
          />
          <StyledInput
            type="text"
            name="resFoodKeyword"
            placeholder="음식 키워드"
            onChange={onChange}
          />
          <StyledInput
            type="text"
            name="resOpenDay"
            placeholder="영업일"
            onChange={onChange}
          />
          <StyledInput
            type="text"
            name="resCloseTime"
            placeholder="운영시간"
            onChange={onChange}
          />
          <StyledInput
            type="text"
            name="resMenuTitle"
            placeholder="메뉴"
            onChange={onChange}
          />
          <StyledInput
            type="text"
            name="resMenuPrice"
            placeholder="메뉴 가격"
            onChange={onChange}
          />
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <StyledButton fullwidth>등록</StyledButton>
        </form>
      </FormBlock>
    </>
  );
};

export default InsertResForm;
