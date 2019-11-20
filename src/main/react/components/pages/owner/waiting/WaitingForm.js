import React from 'react';
import styled from 'styled-components';
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi';
import palette from '../../../../lib/styles/Palette';

const FormContainer = styled.div`
  width: 80%;
  height: auto;
  box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
  margin-left: 10%;
  margin-top: 22%;
  text-align: center;
  padding-bottom: 37px;
  padding-top: 45px;
  overflow: hidden;
`;

const StyledInput = styled.input`
  padding: 0.5rem 0.8rem;
  width: ${props => props.width};
  margin: 45px 30px 0px 30px;
  border-radius: 5px;
  border: 1px solid ${palette.borderGray};
  font-size: 1rem;
  outline: none;

  & + & {
    margin-top: 0.5rem;
  }
`;

const ButtonWrapper = styled.div`
  display: inline-block;
  font-size: 25px;
  position: relative;
  top: 8px;
  .minus {
    color: #ff6b6b;
    opacity: 0.8;
  }
  .plus {
    color: #0ca678;
    opacity: 0.8;
  }
  svg:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const Button = styled.div`
  width: 20%;
  height: 35px;
  float: right;
  margin-right: 111px;
  margin-top: 45px;
  color: white;
  letter-spacing: 2px;
  padding-top: 6px;
  border-radius: 5px;
  background: ${palette.primary};
`;

const WaitingForm = ({ onSubmit }) => {
  return (
    <FormContainer>
      <StyledInput
        placeholder="이름"
        name="wtName"
        width="60%"
        style={{ display: 'block', margin: '0 auto' }}
      />
      <ButtonWrapper>
        <FiMinusCircle className="minus" />
      </ButtonWrapper>
      <StyledInput placeholder="인원 수" name="wtPeople" readOnly width="35%" />
      <ButtonWrapper>
        <FiPlusCircle className="plus" />
      </ButtonWrapper>
      <StyledInput placeholder="전화번호" name="wtPhone" width="60%" />
      <Button onClick={onSubmit}>등록</Button>
    </FormContainer>
  );
};

export default WaitingForm;
