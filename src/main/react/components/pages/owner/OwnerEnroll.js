import React, { useState } from 'react';
import HeaderOwnerSimple from './common/HeaderOwnerSimple';
import styled from 'styled-components';
import Responsive from '../../common/Responsive';
import OwnerForm from './OwnerForm';

const Container = styled.div`
  padding-top: 80px;
  height: 100%;
  min-height: calc(100vh - 12rem);
  background: #f1f3f5;
`;

const ContentWrapper = styled(Responsive)`
  height: auto;
  min-height: calc(100vh - 12rem);
  overflow: hidden;
  justify-content: center;
  &:after {
    content: '';
    display: block;
    clear: both;
  }
  @media (max-width: 425px) {
    height: 1340px;
  }
`;

const Title = styled.div`
  width: 80%;
  height: 50px;
  background: white;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  font-weight: 900;
  font-size: 20px;
  text-align: center;
  padding-top: 14px;
`;

const OwnerEnroll = () => {
  return (
    <>
      <HeaderOwnerSimple />
      <Container>
        <ContentWrapper>
          <Title>회원가입</Title>
          <OwnerForm />
        </ContentWrapper>
      </Container>
    </>
  );
};

export default OwnerEnroll;
