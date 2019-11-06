import React from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';
import ReservationItem from './ReservationItem';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import WaitingItem from './waiting/WaitingItem';

const Container = styled.div`
  margin-top: 40px;
  margin-left: 2px;
  width: 100%;

  &.waiting {
    margin-top: 12px;
    margin-bottom: 20px;
  }
`;
const Title = styled.div`
  margin: 0 auto;
  font-size: 20px;
  width: 95%;
  height: 50px;
  padding-top: 15px;
  padding-left: 20px;
  background: white;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
  border-bottom: 1px solid ${palette.borderGray};
  z-index: 2;
  @media (max-width: 1024px) {
    margin-left: 8px;
    width: 100%;
  }
  @media (max-width: 768px) {
    margin: 0;
    width: 100%;
  }

  &.main {
    @media (max-width: 1024px) {
      width: 100%;
    }
  }
  &.reservation {
    width: 100%;

    @media (max-width: 1024px) {
      margin-left: 0;
    }
  }
  &.waiting {
    width: 100%;
    padding-top: 0.7rem;
    @media (max-width: 1024px) {
      margin-left: 0;
    }
  }
`;

const Content = styled.div`
  background: white;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 0 3px 15px rgba(51, 51, 51, 0.2);
  overflow: hidden;
  &:hover {
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: ${palette.textGray};
      border-radius: 10px;
    }
  }

  &.main {
    margin: 0 auto;
    width: 95%;
    height: 130px;
    @media (max-width: 1024px) {
      margin-left: 8px;
      width: 100%;
    }
    @media (max-width: 768px) {
      margin: 0;
      width: 100%;
    }
  }
  &.reservation {
    width: 100%;
    height: 300px;
  }
  &.waiting {
    width: 100%;
    height: 550px;
    /* margin-left: 8px; */
  }
`;

const ListContainer = ({ list, location: { pathname } }) => {
  return (
    <Container className={pathname == '/figtable/owner/waiting' && 'waiting'}>
      <Title
        className={
          pathname == '/figtable/owner/reservation'
            ? 'reservation'
            : pathname == '/figtable/owner'
            ? 'main'
            : 'waiting'
        }
      >
        {pathname == '/figtable/owner/waiting'
          ? 'Waiting List'
          : '예약대기목록'}
      </Title>
      {pathname == '/figtable/owner' ||
      pathname == '/figtable/owner/reservation' ? (
        <Content
          className={pathname == '/figtable/owner' ? 'main' : 'reservation'}
        >
          {list.map((l, index) => (
            <ReservationItem reservation={l} key={index} />
          ))}
        </Content>
      ) : (
        <Content className="waiting">
          {list.map((l, index) => (
            <WaitingItem waiting={l} key={index} />
          ))}
        </Content>
      )}
    </Container>
  );
};

export default withRouter(ListContainer);
