import React from 'react';
import HeaderOwner from './HeaderOwner';
import OwnerInfo from './OwnerInfo';
import styled from 'styled-components';
import Responsive from '../../common/Responsive';
import OwnerMenu from './OwnerMenu';
import palette from '../../../lib/styles/Palette';
import ReservationList from './ReservationList';

const Container = styled.div`
  padding-top: 80px;
  height: 100%;
  min-height: calc(100vh - 12rem);
  background: #f1f3f5;
`;

const ContentWrapper = styled(Responsive)`
  height: 100%;
  min-height: calc(100vh - 12rem);
  &:after {
    content: '';
    display: block;
    clear: both;
  }
`;

const RightContent = styled.div`
  display: block;
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
`;

const Button = styled.button`
  background: ${palette.primary};
  position: relative;
  outline-style: none;
  top: 485px;
  left: 30px;
  width: 280px;
  height: 50px;
  border: none;
  border-radius: 3px;
  font-weight: 500;
  font-size: 25px;
  color: #f1f3f5;
  font-family: 'Patua One', cursive;
  letter-spacing: 10px;

  @media (max-height: 768px) {
    top: 450px;
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
];

//////////////////////////////////////////////

const OwnerContainer = () => {
  return (
    <>
      <HeaderOwner name={store.name} />
      <Container>
        <ContentWrapper>
          <OwnerInfo store={store} />
          <Button>OPEN</Button>
          <RightContent>
            <OwnerMenu />
            <ReservationList reservations={reservations} />
            {/* </OwnerMenu> */}
          </RightContent>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default OwnerContainer;
