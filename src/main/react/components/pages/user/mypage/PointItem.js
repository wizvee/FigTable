import React from 'react';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  width: 90%;
  margin: 0 auto;
  & + & {
    border-top: 1px dashed ${palette.borderGray};
  }
`;

const State = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  &.plus {
    border: 1px solid #38d9a9;
    color: #38d9a9;
  }
  &.minus {
    border: 1px solid #ff8787;
    color: #ff8787;
  }
`;

const Info = styled.div`
  flex: 1;
  display: grid;
  grid-template-rows: 1fr 1fr;
  small {
    color: ${palette.textGray};
  }
`;

const Point = styled.div`
  &.plus {
    color: #38d9a9;
  }
  &.minus {
    color: #ff8787;
  }
`;

const PointItem = ({ point }) => {
  const isPlus = point.poHistory > 0;

  return (
    <Container>
      <State className={isPlus ? 'plus' : 'minus'}>
        {isPlus ? '적립' : '사용'}
      </State>
      <Info>
        <small>{point.poDate}</small>
        <span>{point.poContent}</span>
      </Info>
      <Point className={isPlus ? 'plus' : 'minus'}>
        {isPlus
          ? `+${new Intl.NumberFormat().format(point.poHistory)}😽`
          : `${new Intl.NumberFormat().format(point.poHistory)}😹`}
      </Point>
    </Container>
  );
};

export default React.memo(PointItem);
