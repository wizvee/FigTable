import React from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import palette from '../../../../lib/styles/Palette';
import { Link } from 'react-router-dom';

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
  top: 16rem;
  width: 24rem;
  height: 8.4rem;
  border-radius: 8px;
`;

const ModalTitle = styled.div`
  width: 100%;
  height: 50px;
  font-size: 18px;
  padding-top: 0.8rem;
  padding-left: 2rem;
  text-align: left;
  border-bottom: 1px solid rgba(134, 142, 150, 0.2);

  svg {
    font-size: 25px;
    float: right;
    margin-right: 1rem;
    opacity: 0.5;

    &:hover {
      cursor: pointer;
      opacity: 1;
    }
  }
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
  height: 50px;
  background-color: gray;
  border-radius: 5px;
  margin-top: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-top: 16px;
  opacity: 0.8;
  background: #f67280;
  color: white;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const ModeSelectModal = ({ modeSelCloseM }) => {
  return (
    <ModalWrapper>
      <Modal>
        <ModalTitle>
          모드 선택
          <MdClose onClick={modeSelCloseM} />
        </ModalTitle>
        <ButtonWrapper>
          <Link to="/figtable/owner/waiting">
            <Button>사장님</Button>
          </Link>
          <Link to="/figtable/owner/public">
            <Button>매장</Button>
          </Link>
        </ButtonWrapper>
      </Modal>
    </ModalWrapper>
  );
};

export default ModeSelectModal;
