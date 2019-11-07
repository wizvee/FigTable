import React, { useState, useCallback, useEffect } from 'react';
import HeaderOwner from './common/HeaderOwner';
import OwnerInfo from './common/OwnerInfo';
import OwnerLeftMenu from './common/OwnerLeftMenu';
import styled from 'styled-components';
import Responsive from '../../common/Responsive';
import OwnerDetailTitle from './common/OwnerDetailTitle';
import OwnerShopForm from './OwnerShopForm';

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
    height: 1500px;
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
  addr: '서울특별시 강동구 길동 247',
  locationKeyword: '길동',
  view: 3,
  reviewCount: 5,
  star: 4.5,
  tel: '02-1234-5678',
  owner: '김사장',
  operation: [
    { openDay: '매일', closeTime: '24시간 영업' },
    {
      openDay: '일요일',
      closeTime: '자정 12시 - 오후 10시 (월요일 10:30 오픈)',
    },
  ],
  menu: [
    { title: '필터커피', price: '4,500원' },
    { title: '필터 스페셜', price: '5,500원' },
    { title: '프로마쥬', price: '6,100원' },
  ],
};
/////////////////////////////////////////////////////

const UpdateOwnerRestautrant = () => {
  const [topMenu, setTopMenu] = useState('false');
  const width = screen.width;

  useEffect(() => {
    const handleResize = () => {
      setTopMenu(window.innerWidth <= 1024 ? true : false);
    };
    window.addEventListener('resize', handleResize);
  });

  return (
    <>
      <HeaderOwner name={store.name} />
      <Container>
        <ContainerWrapper>
          <div className="left">
            <OwnerInfo store={store} />
            <OwnerLeftMenu select="2" />
          </div>
          <Right>
            <OwnerDetailTitle title="가게정보 수정" topMenu={topMenu} />
            <OwnerShopForm store={store} />
          </Right>
        </ContainerWrapper>
      </Container>
    </>
  );
};

export default UpdateOwnerRestautrant;
