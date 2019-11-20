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
  box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
`;

const ModalContent = styled.div`
  width: 100%;
  height: auto;
  padding-top: 24px;
  padding-bottom: 17px;
  line-height: 30px;
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

const ApplyReadyModal = ({ readyClose }) => {
  return (
    <ModalWrapper>
      <Modal>
        <ModalContent>
          관리자 승인 대기중입니다. <br />
          Figtable 파트너 서비스의 이용은 불가능합니다.
        </ModalContent>
        <ButtonWrapper>
          <Link to={`${process.env.PATH}`}>
            <Button onClick={readyClose}>확인</Button>
          </Link>
        </ButtonWrapper>
      </Modal>
    </ModalWrapper>
  );
};

export default ApplyReadyModal;
