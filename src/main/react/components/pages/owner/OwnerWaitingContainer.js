import React from 'react';
import HeaderOwner from './HeaderOwner';
import styled from 'styled-components';
import palette from '../../../lib/styles/Palette';
import Responsive from '../../common/Responsive';
import OwnerDetailTitle from './OwnerDetailTitle';
import ListContainer from './ListContainer';

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
  width: 100%;
  height: 100%;
  float: right;

  /* @media (max-width: 768px) {
    width: 45%;
  } */
  @media (max-width: 425px) {
    width: 100%;
    position: relative;
    top: 430px;
    padding-top: 0.7rem;
  }
`;
const CountContainer = styled.div`
  margin-top: 30px;
  height: 60px;
  width: 100%;
  float: left;
  font-weight: 900;
  font-size: 35px;
  text-align: center;
  letter-spacing: 5px;
  z-index: 10;

  .count {
    z-index: 1;
    display: inline-block;
    position: relative;
    width: 20px;
    top: 3px;
    height: 5px;
    border-radius: 5px;
    background-color: ${palette.primary};
  }
`;

////////////임시데이터////////////////
const store = {
  name: '김사장',
};

const waiting = [
  { name: '김손님', count: '2' },
  { name: '이손님', count: '1' },
  { name: '박손님', count: '5' },
];
////////////////////////////////////

const OwnerWaitingContainer = () => {
  return (
    <>
      <HeaderOwner name={store.name} />
      <Container>
        <ContainerWrapper>
          <OwnerDetailTitle title="Waiting" />
          <CountContainer>현재 {waiting.length} 팀 대기 중</CountContainer>
          <div className="count" />
          <Right>
            <ListContainer list={waiting} />
          </Right>
        </ContainerWrapper>
      </Container>
    </>
  );
};

export default OwnerWaitingContainer;
