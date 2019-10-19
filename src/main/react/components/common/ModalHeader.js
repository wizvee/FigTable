import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/Palette';
import { className } from 'postcss-selector-parser';

const ModalHeaderBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  width: 100%;
  height: 2rem;
  border-bottom: 1px solid #ced4da;
  color: #868e96;

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
    <ModalHeaderBlock>
      {menu.map((m, i) => (
        <div key={m} className={i === 0 && 'selected'}>
          {m}
        </div>
      ))}
    </ModalHeaderBlock>
  );
};

export default ModalHeader;
