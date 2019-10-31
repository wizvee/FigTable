import React from 'react';
import styled from 'styled-components';
import Responsive from '../../../common/Responsive';

const Container = styled(Responsive)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
`;

const Title = styled.div`
  width: 100%;
  background: red;
`;

const WritePresenter = () => {
  return (
    <Container>
      <Title>타이틀</Title>
    </Container>
  );
};

export default WritePresenter;
