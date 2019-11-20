import React from 'react';
import styled from 'styled-components';
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi';
import palette from '../../../../lib/styles/Palette';
import { waiting } from '../../../../lib/api/member';
import { withRouter } from 'react-router-dom';

const FormContainer = styled.div`
  width: 80%;
  height: auto;
  box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
  margin-left: 10%;
  margin-top: 23%;
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
  margin-right: 87px;
  margin-top: 45px;
  color: white;
  letter-spacing: 2px;
  padding-top: 8px;
  border-radius: 5px;
  background: ${palette.primary};
  opacity: 0.8;

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const WaitingForm = ({
  wait,
  onChange,
  onSubmit,
  match,
  onIncrease,
  onDecrease,
  now,
}) => {
  const { resNo } = match.params;
  return (
    <>
      <FormContainer>
        <input type="hidden" name="resNo" value={wait.resNo} />
        <StyledInput
          placeholder="이름"
          name="wtName"
          width="60%"
          value={wait.wtName}
          onChange={onChange}
          style={{ display: 'block', margin: '0 auto' }}
        />
        <ButtonWrapper>
          <FiMinusCircle className="minus" onClick={onDecrease} />
        </ButtonWrapper>
        <StyledInput
          placeholder="인원 수"
          name="wtPeople"
          value={wait.wtPeople}
          onChange={onChange}
          width="35%"
        />
        <ButtonWrapper>
          <FiPlusCircle className="plus" onClick={onIncrease} />
        </ButtonWrapper>
        <br />
        <StyledInput
          placeholder="핸드폰번호"
          name="wtPhone"
          value={wait.wtPhone}
          onChange={onChange}
          width="60%"
        />

        <Button onClick={onSubmit}>등록</Button>
      </FormContainer>
    </>
  );
};

export default withRouter(WaitingForm);
