import React from 'react';
import HeaderOwner from './HeaderOwner';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';
import Responsive from '../../common/Responsive';

const Container = styled.div`
  padding-top: 80px;
  height: auto;
  overflow-y: hidden;
  background: #f1f3f5;

  @media (max-width: 425px) {
    height: 1500px;
  }
`;

const ContainerWrapper = styled(Responsive)`
  height: auto;
  overflow: hidden;
  &:after {
    content: '';
    display: block;
    clear: both;
  }

  @media (max-width: 425px) {
    height: 1500px;
  }
`;

const Right = styled.div`
  padding: 1rem;
  width: 65%;
  height: 100%;
  float: right;
  @media (max-width: 1024px) {
    width: 55%;
  }
  @media (max-width: 768px) {
    width: 45%;
  }
  @media (max-width: 425px) {
    width: 100%;
    position: relative;
    top: 430px;
    padding-top: 0.7rem;
  }
`;
const CountContainer = styled.div`
  border: 1px solid black;
  width: 35%;
  font-size: 35px;
  float: left;
`;

////////////임시데이터////////////////
const store = {
  name: '김사장',
};
////////////////////////////////////

const OwnerWaitingContainer = () => {
  return (
    <>
      <HeaderOwner name={store.name} />
      <Container>
        <CountContainer>현재 대기 인원 수</CountContainer>
        <Right>대기리스트</Right>
      </Container>
    </>
  );
};

export default OwnerWaitingContainer;
