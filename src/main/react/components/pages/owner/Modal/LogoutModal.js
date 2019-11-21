import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ModalWrapper = styled.div`
  display: inline-block;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 50;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  z-index: 50;
  position: fixed;
  top: 0;
`;

const Modal = styled.div`
  position: relative;
  display: flex;
  text-align: center;
  margin: 0px auto;
  flex-direction: column;
  background-color: #a0a5ab;
  top: 3.8rem;
  left: 17.2rem;
  width: 13rem;
  height: auto;
  min-height: 56px;
  border-radius: 5px;
  z-index: 100;
  color: white;

  @media (max-width: 1024px) {
    left: 9.2rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: -0.5rem;
    right: 5.9rem;
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
    border-bottom: 0.5rem solid #a0a5ab;
  }
`;
const Button = styled.div`
  color: #a0a5ab;
  width: 90%;
  height: 30px;
  padding-top: 0.2rem;
  background: white;
  opacity: 0.8;
  margin: 6% 5% 5% 0.7rem;

  font-size: 15px;
  border-radius: 3px;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const ShopItem = styled.div`
  width: 100%;
  height: auto;
  font-size: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  padding-top: 5%;
  padding-bottom: 5%;
  &:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.3);
  }
`;

const LogoutModal = ({ LogoutModalClose }) => {
  return (
    <>
      <ModalWrapper>
        <Modal>
          <Button>매장 추가</Button>
        </Modal>
        <Background onClick={LogoutModalClose} />
      </ModalWrapper>
    </>
  );
};

export default LogoutModal;
