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
  height: auto;

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

const ImageBlock = styled.div`
  margin-top: 0.5rem;
`;

const path = process.env.PATH;
const ImgItem = styled.div`
  flex: 0 0 auto;
  width: 150px;
  height: 150px;
  border-radius: 2px;
  background: url(${props => `${path}/resources/upload/reviews/${props.url}`});
  background-size: cover;
  background-position: center center;
  transition: opacity 0.2s linear;
  @media (max-width: 426px) {
    width: 70px;
    height: 70px;
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

const ActionButtonBlock = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: inline;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledButton = styled(Button)`
  padding: 0.5rem;
  width: 5rem;
  margin: 0.5rem;
  margin-top: 1rem;
`;

const ReviewDetail = ({ review, onReturn, onRemove }) => {
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
        {rvImages &&
          rvImages.map((img, index) => (
            <ImageBlock>
              <ImgItem key={`${index}+${index}+img`} url={img} />
            </ImageBlock>
          ))}
        <ActionButtonBlock>
          <StyledButton onClick={onReturn}>복구</StyledButton>
          <StyledButton onClick={onRemove}>삭제</StyledButton>
        </ActionButtonBlock>
      </FormBlock>
    </>
  );
};

export default ReviewDetail;
