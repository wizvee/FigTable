import React from 'react';
import styled from 'styled-components';
import Button from '../../../../lib/styles/Button';
import palette from '../../../../lib/styles/Palette';
import Responsive from '../../../common/Responsive';
import TextareaAutosize from 'react-textarea-autosize';
import moment from 'moment';

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
    width: 280px;
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

const StyledTextarea = styled(TextareaAutosize)`
  margin-top: 0.5rem;
  padding: 1rem;
  width: 100%;
  resize: none;
  border-radius: 5px;
  border: 1px solid ${palette.borderGray};
  font-size: 1rem;
  overflow: hidden;
  &::placeholder {
    color: ${palette.textGray};
  }
`;

const ReviewDetail = ({ review, actionButtons }) => {
  const {
    rvNo,
    memName,
    resName,
    resAddress,
    rvRating,
    rvContent,
    rvImages,
    rvDate,
  } = review;

  return (
    <>
      <FormBlock>
        <StyledInput type="text" name="memName" value={memName} readOnly />
        <StyledInput
          type="text"
          name="rvDate"
          value={moment(rvDate).format('YYYY-MM-DD')}
          readOnly
        />
        <StyledInput type="text" name="resName" value={resName} readOnly />
        <StyledInput
          type="text"
          name="resAddress"
          value={resAddress}
          readOnly
        />
        <StyledTextarea
          type="text"
          name="rvContent"
          value={rvContent}
          readOnly
        />
        <StyledInput type="hidden" name="rvNo" value={rvNo} readOnly />
        {actionButtons}
      </FormBlock>
    </>
  );
};

export default ReviewDetail;
