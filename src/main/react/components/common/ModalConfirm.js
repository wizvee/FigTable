import React from 'react';
import styled from 'styled-components';
import Button from '../../lib/styles/Button';

// 모달 배경
const Overlay = styled.div`
  z-index: 65;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  z-index: 70;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 3rem;
  width: 310px;
  border-radius: 5px;
  background: white;
  transform: translate(-50%, -50%);
  .msg {
    width: 100%;
    text-align: center;
  }
  .buttons {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 2rem;
  & + & {
    margin-left: 0.5rem;
  }
`;

const ModalConfirm = ({ title, msg, confirm, closeModal }) => {
  return (
    <>
      <Overlay />
      <Container>
        <h3>{title}</h3>
        <div className="msg">{msg}</div>
        <div className="buttons">
          <ButtonWithMarginTop onClick={confirm}>확인</ButtonWithMarginTop>
          <ButtonWithMarginTop onClick={closeModal}>취소</ButtonWithMarginTop>
        </div>
      </Container>
    </>
  );
};

export default React.memo(ModalConfirm);
