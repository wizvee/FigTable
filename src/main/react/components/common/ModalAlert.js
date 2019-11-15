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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 2rem;
  padding: 0.5rem;
`;

const ModalAlert = ({ title, msg, url, closeModal }) => {
  return (
    <>
      <Overlay onClick={closeModal} />
      <Container>
        <h3>{title}</h3>
        <div className="msg">
          {msg}
          {closeModal ? (
            <ButtonWithMarginTop onClick={closeModal} fullwidth>
              확인
            </ButtonWithMarginTop>
          ) : (
            <ButtonWithMarginTop to={url} fullwidth>
              확인
            </ButtonWithMarginTop>
          )}
        </div>
      </Container>
    </>
  );
};

export default ModalAlert;
