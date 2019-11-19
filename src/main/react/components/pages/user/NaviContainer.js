import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Responsive from '../../common/Responsive';
import palette from '../../../lib/styles/Palette';

const Container = styled(Responsive)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 1rem;
  span {
    display: inline-block;
    padding: 0.3rem 0.5rem;
    border-radius: 30px;
    background: ${palette.borderLightGray};
    font-size: 0.9rem;
  }
`;

const NaviContainer = () => {
  const { position } = useSelector(({ guest }) => ({
    position: guest.position,
  }));

  return (
    <Container>
      {position ? (
        <span>
          🧭 현재 위치는 <b>{position.name}</b>
        </span>
      ) : (
        <span>위치 정보가 없어요 😢</span>
      )}
    </Container>
  );
};

export default React.memo(NaviContainer);
