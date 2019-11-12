import React from 'react';
import styled from 'styled-components';
import {
  IoIosCloseCircleOutline,
  IoIosCheckmarkCircleOutline,
} from 'react-icons/io';
import { withRouter } from 'react-router-dom';

const Item = styled.div`
  height: 45px;
  background: white;
  width: 100%;
  padding-left: 10px;
  &:nth-child(even) {
    background: rgba(206, 212, 218, 0.5);
  }

  .content {
    width: 83%;
    height: 100%;
    padding-top: 0.6rem;

    @media (max-width: 1024px) {
      width: 78%;
      padding-top: 3%;
    }
  }

  @media (max-width: 1024px) {
    height: 65px;
  }
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  position: relative;
  top: -39px;
  width: 60px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(1, 1fr);
    top: -61px;
    left: 317px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    top: -61px;
    left: 238px;
  }

  @media (max-width: 425px) {
    grid-template-columns: repeat(1, 1fr);
    top: -61px;
    left: 300px;
  }

  &.main {
    left: 485px;
    @media (max-width: 1024px) {
      left: 320px;
    }
    @media (max-width: 768px) {
      left: 250px;
    }
  }
  &.reservation {
    left: 880px;
    @media (max-width: 1024px) {
      left: 640px;
      top: -47px;
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .reject {
    color: #fa5252;
    &:hover {
      color: #ff8787;
    }
  }
  .approve {
    color: #099268;
    padding-right: 10px;
    &:hover {
      color: #20c997;
    }

    @media (max-width: 1024px) {
      padding-right: 0;
      height: 28px;
    }
  }
  .reject,
  .approve {
    display: inline-block;
    font-size: 30px;
  }
`;

const ReservationItem = ({ reservation, location: { pathname } }) => {
  const { id, date, time, person } = reservation;

  return (
    <Item>
      <div className="content">
        {date} {time} {person}
      </div>
      <ButtonWrapper
        className={pathname == '/figtable/owner' ? 'main' : 'reservation'}
      >
        <div className="approve">
          <IoIosCheckmarkCircleOutline />
        </div>
        <div className="reject">
          <IoIosCloseCircleOutline />
        </div>
      </ButtonWrapper>
    </Item>
  );
};

export default withRouter(ReservationItem);
