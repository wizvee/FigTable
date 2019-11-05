import React from 'react';
import styled from 'styled-components';
import { MdNotifications, MdClose } from 'react-icons/md';
import { FaChair } from 'react-icons/fa';

const Item = styled.div`
  height: 45px;
  background: white;
  width: 100%;
  float: left;

  padding-left: 20px;
  &:nth-child(even) {
    background: rgba(206, 212, 218, 0.5);
  }

  .content {
    width: 83%;
    height: 100%;
    padding-top: 0.8rem;

    @media (max-width: 1024px) {
      padding-top: 13px;
    }
  }

  /* @media (max-width: 1024px) {
    height: 65px;
  } */
`;

const InnerContent = styled.div`
  display: inline-block;
  height: 100%;
  width: 120px;
  text-align: center;
  position: relative;
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  position: relative;
  top: -45px;
  left: 792px;
  width: 140px;
  height: 100%;

  @media (max-width: 1024px) {
    top: -45px;
    left: 530px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    top: -45px;
    left: 530px;
  }

  .noti,
  .seat,
  .cancel {
    width: 35px;
    height: 35px;
    margin-top: 5px;
    opacity: 0.8;
    &:hover {
      opacity: 1;
    }
  }
  .noti {
    border: 2px solid #fab005;
    color: #fab005;
  }
  .seat {
    font-size: 30px;
    padding: 2px;
    border: 2px solid #495057;
    color: #495057;
  }
  .cancel {
    border: 2px solid #fa5252;
    color: #fa5252;
  }

  /* .noti:hover,
  .seat:hover,
  .cancel:hover {
    opacity: 1;
  } */
`;

const WaitingItem = ({ waiting }) => {
  const { name, count } = waiting;

  return (
    <Item>
      <div className="content">
        <InnerContent>{name}</InnerContent>
        <InnerContent>{count}명</InnerContent>
      </div>
      <ButtonWrapper>
        <MdNotifications className="noti" />
        <FaChair className="seat" />
        <MdClose className="cancel" />
      </ButtonWrapper>
    </Item>
  );
};

export default WaitingItem;
