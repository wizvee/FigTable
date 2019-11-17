import React from 'react';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import { Link } from 'react-router-dom';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: white;
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
  width: 24rem;
  height: 10rem;
  border-radius: 5px;
`;

const ModalContent = styled.div`
  width: 100%;
  height: auto;
  padding-top: 28px;
  padding-bottom: 24px;
  font-size: 17px;
`;

const ButtonWrapper = styled.div`
  width: 74%;
  height: auto;
  margin: 0 auto;
  text-align: center;
`;

const Button = styled.div`
  display: inline-block;
  width: 45%;
  height: 40px;
  background-color: gray;
  border-radius: 5px;
  margin-left: 0.5rem;
  margin-right: 0.4rem;
  padding-top: 10px;
  opacity: 0.8;
  background: ${palette.primary};
  color: white;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const SuccessModal = sModalClose => {
  return (
    <ModalWrapper>
      <Modal>
        <ModalContent>
          가입이 완료되었습니다.
          <br />
          관리자의 승인을 기다려주세요
        </ModalContent>
        <ButtonWrapper>
          <Link to={`${process.env.PATH}`}>
            <Button onClick={sModalClose}>확인</Button>
          </Link>
        </ButtonWrapper>
      </Modal>
    </ModalWrapper>
  );
};

export default SuccessModal;
