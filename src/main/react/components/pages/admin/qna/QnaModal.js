import React from 'react';
import styled from 'styled-components';
import { IoMdSend } from 'react-icons/io';
import palette from '../../../../lib/styles/Palette';
import TextareaAutosize from 'react-textarea-autosize';

const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const Modal = styled.div`
  position: relative;
  display: flex;
  text-align: center;
  margin: 0px auto;
  flex-direction: column;
  background-color: white;
  top: 10rem;
  width: 25rem;
  height: 10rem;
  border-radius: 8px;
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

const FormWrapper = styled.div`
  display: flex;
`;

const StyledForm = styled.form`
  position: relative;
  width: 100%;
  height: auto;
  button {
    position: absolute;
    top: 50%;
    right: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;
    background: transparent;
    transform: translateY(-50%);
    font-size: 1rem;
    color: ${palette.textGray};
    transition: color 0.2s linear;
    cursor: pointer;
    &:hover {
      color: ${palette.text};
    }
  }
`;

const StyledInput = styled.input`
  padding: 1rem;
  width: 100%;
  height: 3rem;
  border-top: 1px solid ${palette.borderGray};
  font-size: 1rem;
  bottom: 0;
`;

const QnaModal = ({ qna, onChange, onSubmit }) => {
  return (
    <>
      <ModalWrap>
        <Modal>
          <FormWrapper>
            <StyledForm onSubmit={onSubmit}>
              <StyledInput name="input" onChange={onChange} />
              <button>
                <IoMdSend />
              </button>
            </StyledForm>
          </FormWrapper>
        </Modal>
      </ModalWrap>
    </>
  );
};

export default QnaModal;
