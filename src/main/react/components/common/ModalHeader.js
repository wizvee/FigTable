import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/Palette';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 2rem;
  width: 100%;
  height: 2rem;
  border-bottom: 1px solid ${palette.borderGray};
  color: ${palette.textGray};
  div {
    display: flex;
    align-items: center;
    padding: 0 1.3rem;
    height: 100%;
    &.selected {
      border-bottom: 2.5px solid ${palette.primary};
      color: ${palette.primary};
    }
  }
`;

const ModalHeader = ({ menu }) => {
  return (
    <Container>
      {menu.map((m, i) => (
        <div key={m} className={i === 0 ? 'selected' : undefined}>
          {m}
        </div>
      ))}
    </Container>
  );
};

export default ModalHeader;
