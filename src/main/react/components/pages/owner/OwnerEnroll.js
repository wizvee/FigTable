import React from 'react';
import HeaderOwner from './common/HeaderOwner';
import styled from 'styled-components';

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
  &:after {
    content: '';
    display: block;
    clear: both;
  }
  @media (max-width: 425px) {
    height: 1340px;
  }
`;

const OwnerEnroll = () => {
  return (
    <>
      <HeaderOwner />
      <Container>
        <ContentWrapper>회원가입</ContentWrapper>
      </Container>
    </>
  );
};
