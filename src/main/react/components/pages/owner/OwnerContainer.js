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

const Button = styled.div`
  position: relative;
  top: 430px;
  left: 42px;
  width: 250px;
  height: 60px;
  display: inline-block;
`;

const ButtonInput = styled.input.attrs({ type: 'checkbox' })`
  display: none;

  &:checked + ${ButtonLabel}::before {
    top: 0;
    left: 0;
    width: 250px;
    background: ${palette.primary};
  }

  &:checked + ${ButtonLabel}::after {
    left: 190px;
    box-shadow: inset 0 0 0 1px rgba(246, 114, 128, 0.5),
      0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;
const ButtonLabel = styled.label`
  display: inline-block;
  background: white;
  cursor: pointer;
  position: relative;
  box-shadow: inset 0 0 0px 1px #d5d5d5;
  width: 250px;
  height: 60px;
  border-radius: 50px;
  top: 0;
  left: 0;

  &::before {
    content: '';
    position: absolute;
    display: block;
    height: 60px;
    width: 250px;
    top: 0;
    left: 0;
    border-radius: 50px;

    -moz-transition: 0.25s ease-in-out;
    -webkit-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;
  }

  &::after {
    content: '';
    position: absolute;
    display: block;
    height: 50px;
    width: 50px;
    top: 5px;
    left: 10px;
    border-radius: 50px;
    background: white;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2);
    -moz-transition: 0.25s ease-in-out;
    -webkit-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;
  }
`;

const ButtonSpan = styled.span`
  position: relative;
  top: 19px;
  left: 85px;
  font-weight: 500;
  letter-spacing: 5px;
  color: ${palette.textGray};
  font-size: 20px;
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

//////////////////////////////////////////////

const OwnerContainer = () => {
  return (
    <>
      <HeaderOwner name={store.name} />
      <Container>
        <ContentWrapper>
          <OwnerInfo store={store} />
          <Button>
            <ButtonInput id="buttonInput" />
            <ButtonLabel for="buttonInput">
              <ButtonSpan>영업종료</ButtonSpan>
            </ButtonLabel>
          </Button>
          <RightContent>
            <OwnerMenu />
            <ReservationList reservations={reservations} />
          </RightContent>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default OwnerContainer;
