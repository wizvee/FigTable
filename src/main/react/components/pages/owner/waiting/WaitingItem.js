import React from 'react';
import styled from 'styled-components';
import { MdNotifications, MdClose } from 'react-icons/md';
import { FaChair } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';

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
`;

const InnerContent = styled.div`
  display: inline-block;
  height: 100%;
  width: 120px;
  text-align: center;
  position: relative;

  &.main {
    @media (max-width: 1024px) {
      width: 90px;
    }
    @media (max-width: 768px) {
      width: 60px;
    }
  }
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
  &.main {
    left: 410px;
    @media (max-width: 1024px) {
      left: 205px;
    }
    @media (max-width: 768px) {
      left: 133px;
    }
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
`;

const WaitingItem = ({ waiting, location: { pathname } }) => {
  const { name, count } = waiting;

  return (
    <Item>
      <div className="content">
        <InnerContent className={pathname == '/figtable/owner' && 'main'}>
          {name}
        </InnerContent>
        <InnerContent className={pathname == '/figtable/owner' && 'main'}>
          {count}명
        </InnerContent>
      </div>
      <ButtonWrapper className={pathname == '/figtable/owner' && 'main'}>
        <MdNotifications className="noti" />
        <FaChair className="seat" />
        <MdClose className="cancel" />
      </ButtonWrapper>
    </Item>
  );
};

export default withRouter(WaitingItem);
