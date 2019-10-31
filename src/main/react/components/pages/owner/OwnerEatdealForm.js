import React from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';
import { MdBlock } from 'react-icons/md';

const FormContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
  display: relative;
  padding-bottom: 20px;
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

  height: auto;
  overflow: hidden;

  & + & {
    margin-top: 0.5rem;
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

const OwnerEatdealForm = () => {
  return (
    <>
      <FormContainer>
        <SubTitle>Eat Deal 등록</SubTitle>
        <StyledInput type="text" name="resName" placeholder="변경" />
        <StyledInput type="text" name="resName" placeholder="변경" />
        <StyledInput type="text" name="resName" placeholder="변경" />
        <StyledInput type="text" name="resName" placeholder="변경" />
        <StyledInput type="text" name="resName" placeholder="변경" />
        <StyledInput type="text" name="resName" placeholder="변경" />
      </FormContainer>

      <StyledButton type="button" value="등록" />

      <div
        style={{
          height: '300px',
          width: '100%',
          display: 'block',
          background: 'white',
          marginTop: '80px',
        }}
      >
        Eat Deal 관리
      </div>
    </>
  );
};

export default OwnerEatdealForm;
