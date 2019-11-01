import React from 'react';
import HeaderOwner from './HeaderOwner';
import styled from 'styled-components';
import Responsive from '../../common/Responsive';
import OwnerInfo from './OwnerInfo';
import OwnerLeftMenu from './OwnerLeftMenu';
import ReservationList from './ReservationList';
import OwnerDetailTitle from './OwnerDetailTitle';

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

const reservations = [
  {
    id: 1,
    date: '2019-10-29',
    time: 'PM 10:00',
    person: '성인 2인',
  },
  {
    id: 2,
    date: '2019-10-30',
    time: 'PM 03:00',
    person: '성인 2인, 유아 1인',
  },
  {
    id: 3,
    date: '2019-11-02',
    time: 'AM 11:00',
    person: '성인 4인, 유아 2인',
  },
  {
    id: 4,
    date: '2019-11-12',
    time: 'PM 02:00',
    person: '성인 6인',
  },
];
////////////////////////////////////////////////

const OwnerReservationContainer = () => {
  return (
    <>
      <HeaderOwner name={store.name} />
      <Container>
        <ContainerWrapper>
          <OwnerInfo store={store} />
          <OwnerLeftMenu select="2" />
          <Right>
            <OwnerDetailTitle title="예약 관리" />
            <div style={{ height: '600px' }}>스케줄러 추가</div>
            <ReservationList reservations={reservations} />
          </Right>
        </ContainerWrapper>
      </Container>
    </>
  );
};

export default OwnerReservationContainer;
