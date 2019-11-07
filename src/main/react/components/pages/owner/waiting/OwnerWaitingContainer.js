import React from 'react';
import HeaderOwner from '../common/HeaderOwner';
import styled from 'styled-components';
import palette from '../../../../lib/styles/Palette';
import Responsive from '../../../common/Responsive';
import OwnerDetailTitle from '../common/OwnerDetailTitle';
import ListContainer from '../ListContainer';

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

  @media (max-width: 425px) {
    width: 100%;
    position: relative;
    top: 430px;
    padding-top: 0.7rem;
  }
`;
const CountContainer = styled.div`
  margin: 0 auto;
  margin-top: 30px;
  height: 60px;
  width: 45%;
  font-weight: 500;
  font-size: 30px;
  text-align: center;
  padding-top: 7px;
  letter-spacing: 7px;
  border-radius: 5px;
  z-index: 10;
  background: rgba(246, 114, 128, 0.7);
  color: white;
  .count {
    color: ${palette.textGray};
    font-weight: 900;
  }
  @media (max-width: 1024px) {
    letter-spacing: 2px;
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
          <CountContainer>
            현재 <span className="count">{waiting.length}</span> 팀 대기 중
          </CountContainer>
          <Right>
            <ListContainer list={waiting} />
          </Right>
        </ContainerWrapper>
      </Container>
    </>
  );
};

export default OwnerWaitingContainer;
