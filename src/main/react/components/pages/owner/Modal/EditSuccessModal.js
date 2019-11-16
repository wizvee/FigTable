import React from 'react';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 50;
`;

const Modal = styled.div`
  position: relative;
  display: flex;
  text-align: center;
  margin: 0px auto;
  flex-direction: column;
  background-color: white;
  top: 14rem;
  width: 20rem;
  padding-top: 1.8rem;
  height: 8rem;
  border-radius: 5px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
`;

const Button = styled.div`
  margin: 1rem;
  display: inline-block;
  width: 35%;
  height: 38px;
  background-color: gray;
  border-radius: 5px;
  margin-top: 1.3rem;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-top: 10px;
  opacity: 0.8;
  background: #f67280;
  color: white;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const EditSuccessModal = ({ successModalClose }) => {
  return (
    <ModalWrapper>
      <Modal>
        정보 수정이 완료되었습니다.
        <ButtonWrapper>
          <Button onClick={successModalClose}>확인</Button>
        </ButtonWrapper>
      </Modal>
    </ModalWrapper>
  );
};

export default EditSuccessModal;
