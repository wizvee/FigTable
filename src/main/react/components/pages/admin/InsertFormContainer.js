import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
`;

const InsertFormContainer = ({ type }) => {
  return (
    <>
      <HeaderWrapper>
        <h3>{type} 등록</h3>
      </HeaderWrapper>
    </>
  );
};

export default InsertFormContainer;
