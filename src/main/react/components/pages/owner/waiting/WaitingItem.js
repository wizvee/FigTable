import React, { useEffect } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { FaChair } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';
import SeatModal from '../Modal/SeatModal';

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
  width: 100px;
  text-align: center;
  position: relative;

  &.phone {
    width: 170px;

    @media (max-width: 1024px) {
      width: 150px;
    }

    @media (max-width: 768px) {
      width: 130px;
    }
  }

  &.main {
    width: 80px;
    @media (max-width: 1024px) {
      width: 60px;
    }
    @media (max-width: 768px) {
      width: 50px;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  position: relative;
  top: -45px;
  left: 730px;
  width: 140px;
  height: 100%;

  @media (max-width: 1024px) {
    top: -45px;
    left: 573px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    top: -45px;
    left: 571px;
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

const WaitingItem = ({
  waiting,
  location: { pathname },
  match,
  seatModal,
  seatModalOpen,
  seatModalClose,
}) => {
  const { resNo } = match.params;
  const path = process.env.PATH;

  const { wtName, wtPeople, wtPhone } = waiting;

  return (
    <>
      <Item>
        <div className="content">
          <InnerContent
            className={pathname == `${path}/owner/${resNo}` && 'main'}
          >
            {wtName}
          </InnerContent>
          <InnerContent
            className={pathname == `${path}/owner/${resNo}` && 'main'}
          >
            {wtPeople}명
          </InnerContent>

          <InnerContent className="phone">{wtPhone}</InnerContent>
        </div>
        {pathname == `${path}/owner/${resNo}/waiting` && (
          <ButtonWrapper>
            <FaChair className="seat" onClick={seatModalOpen} />
            <MdClose className="cancel" />
          </ButtonWrapper>
        )}
      </Item>
      {seatModal && <SeatModal seatModalClose={seatModalClose} />}
    </>
  );
};

export default withRouter(WaitingItem);
