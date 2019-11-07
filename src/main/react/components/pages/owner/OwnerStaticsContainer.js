import React from 'react';
import styled from 'styled-components';
import HeaderOwner from './common/HeaderOwner';
import OwnerLeftMenu from './common/OwnerLeftMenu';
import OwnerInfo from './common/OwnerInfo';
import Responsive from '../../common/Responsive';

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

////////// 임시데이터//////////////////////////
const store = {
  name: '김사장',
  shopName: '페더커피 ',
  imgUrl:
    'https://mp-seoul-image-production-s3.mangoplate.com/528686_1563717610211710.jpg?fit=around|738:738&crop=738:738;*,*&output-format=jpg&output-quality=80',
  foodKeyword: '당근케이크,카페',
  locationKeyword: '길동',
  view: 3,
  reviewCount: 5,
  star: 4.5,
};

//////////////////////////////////////////////

const OwnerStaticsContainer = () => {
  return (
    <>
      <HeaderOwner />
      <Container>
        <ContentWrapper>
          <OwnerInfo store={store} />
          <OwnerLeftMenu />
        </ContentWrapper>
      </Container>
    </>
  );
};

export default OwnerStaticsContainer;
