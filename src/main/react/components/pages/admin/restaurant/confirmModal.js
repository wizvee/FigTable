import React from 'react';
import styled from 'styled-components';
import Button from '../../../../lib/styles/Button';

const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 90;
`;
const Modal = styled.div`
  position: relative;
  display: flex;
  text-align: center;
  margin: 0px auto;
  flex-direction: column;
  background-color: white;
  top: 14rem;
  width: 15rem;
  height: 9rem;
  border-radius: 8px;
`;
const Content = styled.div`
  margin-top: 2.5rem;
`;

const StyledButton = styled(Button)`
  padding: 0.5rem;
  width: 5rem;
  margin: 1rem;
`;

const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const confirmModal = ({ msg, onCloseModal }) => {
  return (
    <ModalWrap>
      <Modal>
        <Content>{msg}</Content>
        <ButtonWrapper>
          <StyledButton onClick={onCloseModal}>확인</StyledButton>
        </ButtonWrapper>
      </Modal>
    </ModalWrap>
  );
};

export default confirmModal;
