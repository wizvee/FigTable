import React from 'react';
import styled from 'styled-components';
import Responsive from '../../common/Responsive';

const Container = styled(Responsive)`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 2rem;
  min-height: calc(100vh - 12rem);
`;

const RegisterPresenter = () => {
  return <Container>회원가입</Container>;
};

export default RegisterPresenter;
