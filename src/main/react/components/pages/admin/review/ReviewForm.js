import React from 'react';
import styled from 'styled-components';
import Button from '../../../../lib/styles/Button';
import palette from '../../../../lib/styles/Palette';
import Responsive from '../../../common/Responsive';

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
  height: 23rem;

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

const ReviewForm = ({ review }) => {
  return (
    <>
      <FormBlock>
        <StyledInput
          type="text"
          name="ownResName"
          value={review.ownResName}
          readOnly
        />
        <StyledInput
          type="text"
          name="ownResAddress"
          value={review.ownResAddress}
          readOnly
        />
        <StyledInput
          type="tel"
          name="resTel"
          value={review.ownResTel}
          readOnly
        />
        <StyledInput
          type="text"
          name="ownName"
          value={review.ownName}
          readOnly
        />
        <StyledInput
          type="text"
          name="ownEmail"
          value={review.ownEmail}
          readOnly
        />
        <StyledInput type="hidden" name="ownPassword" />
        <StyledInput type="hidden" name="ownNo" />
        <ButtonWrapper>
          <StyledButton onClick={changePage}>네</StyledButton>
          <StyledButton onClick={closeModal}>아니오</StyledButton>
        </ButtonWrapper>
      </FormBlock>
    </>
  );
};

export default ReviewForm;
