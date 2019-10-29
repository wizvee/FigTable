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
    cursor: pointer;
    &.selected {
      border-bottom: 2.5px solid ${palette.primary};
      color: ${palette.primary};
    }
  }
`;

const ModalHeader = ({ menu, select, setSelect }) => {
  return (
    <Container>
      {menu.map(({ key, text }) => (
        <div
          key={key}
          className={select === key ? 'selected' : ''}
          onClick={() => setSelect(key)}
        >
          {text}
        </div>
      ))}
    </Container>
  );
};

export default ModalHeader;
