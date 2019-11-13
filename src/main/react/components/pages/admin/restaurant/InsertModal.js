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
  top: 10rem;
  width: 24rem;
  height: 12rem;
  border-radius: 8px;
`;
const Content = styled.div`
  margin-top: 3rem;
`;

const StyledButton = styled(Button)`
  padding: 0.5rem;
  width: 5rem;
  margin: 0.5rem;
`;

const ButtonWrapper = styled.div`
  display: inline;
  margin: 3rem auto;
  flex-direction: column;
  text-align: center;
`;

const insertModal = ({ msg, url }) => {
  return (
    <ModalWrap>
      <Modal>
        <Content>{msg}</Content>
        <StyledButton to={url}>확인</StyledButton>
      </Modal>
    </ModalWrap>
  );
};

export default insertModal;
