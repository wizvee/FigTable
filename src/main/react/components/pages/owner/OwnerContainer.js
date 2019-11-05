import React, { useState } from 'react';
import HeaderOwner from './common/HeaderOwner';
import OwnerInfo from './common/OwnerInfo';
import styled from 'styled-components';
import Responsive from '../../common/Responsive';
import OwnerMenu from './OwnerMenu';
import palette from '../../../lib/styles/Palette';
import ListContainer from './ListContainer';
import ShopOpenModal from './Modal/ShopOpenModal';

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
  @media (max-width: 425px) {
    width: 100%;
    position: relative;
    top: 430px;
    padding-top: 2rem;
  }
`;

const Button = styled.div`
  position: relative;
  top: 430px;
  left: 59px;
  width: 210px;
  height: 60px;
  display: inline-block;

  @media (max-width: 425px) {
    left: 64px;
  }
`;

const ButtonInput = styled.input.attrs({ type: 'checkbox' })`
  display: none;

  &:checked + ${ButtonLabel}::before {
    top: 0;
    left: 0;
    width: 210px;
    background: ${palette.primary};
  }

  &:checked + ${ButtonLabel}::after {
    left: 150px;
    box-shadow: inset 0 0 0 1px rgba(246, 114, 128, 0.5),
      0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &:checked + ${ButtonSpan} {
    background: red;
  }
`;
const ButtonLabel = styled.label`
  display: inline-block;
  background: white;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  box-shadow: inset 0 0 0px 1px #d5d5d5;
  width: 210px;
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
  left: 65px;
  font-weight: 500;
  letter-spacing: 5px;
  color: ${palette.textGray};
  font-size: 20px;
  height: 22px;
  width: 110px;
  &::before {
    content: '영업종료';
  }
  ${ButtonInput}:checked + ${ButtonLabel} &::after {
    display: inline-block;
    overflow-y: hidden;
    position: relative;
    left: -107px;
    width: 110px;
    padding-bottom: 36px;
    text-align: center;
    content: '영업중';
    color: white;
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

//////////////////////////////////////////////

const OwnerContainer = () => {
  const [shopModal, setIsShopModal] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [modeSelModal, setModeSelModal] = useState(false);

  const shopOpenM = () => {
    setIsShopModal(true);
    document.getElementsByTagName('label')[0].click();
  };
  const shopCloseM = open => {
    {
      open == true
        ? (document.getElementsByTagName('label')[0].click(),
          setShopOpen(!shopOpen))
        : '';
    }
    setIsShopModal(false);
  };
  const modeSelOpenM = () => {
    setModeSelModal(true);
    console.log(medeSelModal);
  };
  const modeSelCloseM = () => {
    setModeSelModal(false);
  };

  return (
    <>
      <HeaderOwner name={store.name} />
      <Container>
        <ContentWrapper>
          <OwnerInfo store={store} />
          <Button>
            <ButtonInput id="buttonInput" />
            <ButtonLabel htmlFor="buttonInput" onClick={shopOpenM}>
              <ButtonSpan></ButtonSpan>
            </ButtonLabel>
          </Button>
          <RightContent>
            <OwnerMenu
              modeSelModal={modeSelModal}
              modeSelOpenM={modeSelOpenM}
              modeSelCloseM={modeSelCloseM}
            />
            <ListContainer list={reservations} />
          </RightContent>
        </ContentWrapper>
      </Container>

      {!shopModal ? null : (
        <ShopOpenModal shopOpen={shopOpen} shopCloseM={shopCloseM} />
      )}
    </>
  );
};

export default OwnerContainer;
