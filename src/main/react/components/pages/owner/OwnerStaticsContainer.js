import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import HeaderOwner from './common/HeaderOwner';
import OwnerLeftMenu from './common/OwnerLeftMenu';
import OwnerInfo from './common/OwnerInfo';
import Responsive from '../../common/Responsive';
import OwnerDetailTitle from './common/OwnerDetailTitle';

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

  .left {
    width: auto;
    height: auto;
    display: inline-block;
  }

  @media (max-width: 1024px) {
    .left {
      display: none;
    }
  }
  @media (max-width: 425px) {
    height: 1340px;
  }
`;

const Right = styled.div`
  padding: 1rem;
  width: 65%;
  height: 100%;
  float: right;

  @media (max-width: 1024px) {
    width: 100%;
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
  locationKeyword: '길동',
  view: 3,
  reviewCount: 5,
  star: 4.5,
};

//////////////////////////////////////////////

const OwnerStaticsContainer = () => {
  const [topMenu, setTopMenu] = useState('false');

  useEffect(() => {
    setTopMenu(window.innerWidth <= 1024 ? true : false);
    const handleResize = () => {
      setTopMenu(window.innerWidth <= 1024 ? true : false);
    };
    window.addEventListener('resize', handleResize);
  });
  return (
    <>
      <HeaderOwner name={store.name} />
      <Container>
        <ContentWrapper>
          <div className="left">
            <OwnerInfo store={store} />
            <OwnerLeftMenu />
          </div>
          <Right>
            <OwnerDetailTitle title="통계" topMenu={topMenu} />
            <div
              style={{
                width: '100%',
                height: '300px',
                background: 'white',
                marginTop: '20px',
              }}
            >
              시간대별 통계
            </div>
            <div
              style={{
                float: 'left',
                width: '48%',
                height: '300px',
                background: 'white',
                marginTop: '20px',
              }}
            >
              연령별 통계
            </div>
            <div
              style={{
                float: 'right',
                width: '48%',
                height: '300px',
                background: 'white',
                marginTop: '20px',
              }}
            >
              성별 통계
            </div>
          </Right>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default OwnerStaticsContainer;