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
  height: 13rem;
  border-radius: 5px;
  box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
`;

const ModalContent = styled.div`
  width: 100%;
  height: auto;
  padding-top: 15px;
  padding-bottom: 25px;
  line-height: 30px;
`;

const ModalTitle = styled.div`
  width: 100%;
  height: 50px;
  font-size: 18px;
  padding-top: 0.8rem;
  padding-left: 2rem;
  text-align: left;
  border-bottom: 1px solid rgba(134, 142, 150, 0.2);
`;

const ButtonWrapper = styled.div`
  width: 74%;
  height: auto;
  margin: 0 auto;
  text-align: center;
`;

const Button = styled.div`
  display: inline-block;
  width: 40%;
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

const ApplyReadyModal = ({ ownReturn, returnClose }) => {
  return (
    <ModalWrapper>
      <Modal>
        <ModalTitle>가입 반려</ModalTitle>
        <ModalContent>
          <div className="title">반려사유</div>
          {ownReturn}
        </ModalContent>
        <ButtonWrapper>
          <Link to={`${process.env.PATH}/ownerEnroll`}>
            <Button onClick={returnClose}>재회원가입</Button>
          </Link>
          <Link to={`${process.env.PATH}`}>
            <Button onClick={returnClose}>메인페이지로</Button>
          </Link>
        </ButtonWrapper>
      </Modal>
    </ModalWrapper>
  );
};

export default ApplyReadyModal;
