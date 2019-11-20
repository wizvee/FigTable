import React from 'react';
import styled from 'styled-components';
import Button from '../../../../lib/styles/Button';
import palette from '../../../../lib/styles/Palette';
import Responsive from '../../../common/Responsive';
import TextareaAutosize from 'react-textarea-autosize';

const FormBlock = styled(Responsive)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
  left: 0;
  bottom: 0;
  right: 0;
  position: relative;
  height: 25rem;

  form {
    width: 320px;
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
  padding: 0.5rem;
  width: 5rem;
  margin: 0.5rem;
  margin-top: 1rem;
`;

const ButtonWrapper = styled.div`
  display: inline;
  flex-direction: column;
  text-align: center;
`;

const ImageBlock = styled.div`
  margin-top: 0.5rem;
`;

const path = process.env.PATH;
const ImgItem = styled.div`
  align-items: center;
  display: inline-block;
  width: 150px;
  height: 150px;
  border-radius: 2px;
  background: url(${props =>
    `${path}/resources/upload/ownerAuth/${props.url}`});
  background-size: cover;
  background-position: center center;
  transition: opacity 0.2s linear;
  @media (max-width: 426px) {
    width: 70px;
    height: 70px;
  }
`;

const StyledTextarea = styled(TextareaAutosize)`
  margin: 0.5rem;
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

const ApplyOwnerForm = ({ owner, onReturn, onSubmit, onChange }) => {
  const {
    ownEmail,
    ownPhone,
    ownName,
    resName,
    resAddress,
    license,
    ownReturn,
  } = owner;

  return (
    <>
      <FormBlock>
        <form>
          <StyledInput
            type="text"
            name="ownResName"
            value={resName}
            onChange={onChange}
            readOnly
          />
          <StyledInput
            type="text"
            name="ownResAddress"
            value={resAddress}
            onChange={onChange}
            readOnly
          />
          <StyledInput
            type="text"
            name="ownName"
            value={ownName}
            onChange={onChange}
            readOnly
          />
          <StyledInput
            type="text"
            name="ownEmail"
            value={ownEmail}
            onChange={onChange}
            readOnly
          />
          {license && (
            <ImageBlock>
              <ImgItem url={license} />
            </ImageBlock>
          )}
          {/* 반려사유 등록할 인풋 */}
          <StyledTextarea
            type="text"
            name="ownReturn"
            placeholder="반려사유"
            onChange={onChange}
            value={ownReturn}
          />

          <ButtonWrapper>
            <StyledButton onClick={onSubmit}>승인</StyledButton>
            <StyledButton onClick={onReturn}>반려</StyledButton>
          </ButtonWrapper>
        </form>
      </FormBlock>
    </>
  );
};

export default ApplyOwnerForm;
