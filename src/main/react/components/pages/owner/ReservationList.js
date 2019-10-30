import React from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';
import ReservationItem from './ReservationItem';

const Container = styled.div`
  margin-top: 40px;
  margin-left: 2px;
  width: 100%;
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
`;

const Content = styled.div`
  width: 95%;
  height: 130px;
  margin: 0 auto;
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
  @media (max-width: 1024px) {
    margin-left: 8px;
    width: 100%;
  }
  @media (max-width: 768px) {
    margin: 0;
    width: 100%;
  }
`;

const ReservationList = ({ reservations }) => {
  return (
    <Container>
      <Title>예약대기목록</Title>
      <Content>
        {reservations.map(reservation => (
          <ReservationItem reservation={reservation} key={reservation.id} />
        ))}
      </Content>
    </Container>
  );
};

export default ReservationList;
