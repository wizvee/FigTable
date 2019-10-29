import React from 'react';
import styled from 'styled-components';

const Item = styled.div`
  height: 45px;
  background: white;
  width: 100%;
  line-height: 45px;
  &:nth-child(even) {
    background: rgba(206, 212, 218, 0.5);
  }
`;

const ReservationItem = ({ reservation }) => {
  const { id, date, time, person } = reservation;

  return (
    <Item>
      {date} {time} {person}
    </Item>
  );
};

export default ReservationItem;
