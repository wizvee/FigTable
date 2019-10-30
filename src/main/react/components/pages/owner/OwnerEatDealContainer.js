import React from 'react';
import HeaderOwner from './HeaderOwner';
import styled from 'styled-components';
import Responsive from '../../common/Responsive';
import OwnerInfo from './OwnerInfo';
import OwnerLeftMenu from './OwnerLeftMenu';
import OwnerDetailTitle from './OwnerDetailTitle';

const Container = styled.div`
  padding-top: 80px;
  min-height: calc(100vh - 12rem);
  height: auto;
  overflow-y: hidden;
  background: #f1f3f5;

  @media (max-width: 425px) {
    height: 1500px;
  }
`;

const ContainerWrapper = styled(Responsive)`
  min-height: calc(100vh - 12rem);
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
  border: 1px solid red;
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

////////// 임시데이터//////////////////////////
const store = {
  name: '김사장',
  shopName: '페더커피 ',
  imgUrl:
    'https://mp-seoul-image-production-s3.mangoplate.com/528686_1563717610211710.jpg?fit=around|738:738&crop=738:738;*,*&output-format=jpg&output-quality=80',
  foodKeyword: '당근케이크,카페',
  addr: '서울특별시 강동구 길동 247',
  locationKeyword: '길동',
  view: 3,
  reviewCount: 5,
  star: 4.5,
};
/////////////////////////////////////////////////////

const OwnerEatDealContainer = () => {
  return (
    <>
      <HeaderOwner name={store.name} />
      <Container>
        <ContainerWrapper>
          <OwnerInfo store={store} />
          <OwnerLeftMenu select="5" />
          <Right>
            <OwnerDetailTitle title="Eat Deal" />
          </Right>
        </ContainerWrapper>
      </Container>
    </>
  );
};

export default OwnerEatDealContainer;
