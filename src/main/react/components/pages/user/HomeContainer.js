import React, { useState } from 'react';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';
import HomePresenter from './HomePresenter';
import Responsive from '../../common/Responsive';
import palette from '../../../lib/styles/Palette';
import HeaderContainer from '../../common/HeaderContainer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 31rem;
  background: url(${process.env.PATH}/images/title.png);
  background-size: cover;
  background-position: center center;
  .title {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 2rem;
    font-weight: 600;
    color: white;
    form {
      position: relative;
      margin-top: 2rem;
      input {
        padding: 0.5rem 1.5rem;
        border: 3px solid ${palette.primary};
        border-radius: 1.5rem;
        /* color: white; */
        background: white;
        font-size: 1.3rem;
        &::placeholder {
          color: #ced4da;
        }
      }
      svg {
        position: absolute;
        top: 50%;
        right: 1rem;
        color: ${palette.primary};
        transform: translateY(-50%);
      }
    }
  }
  .ad {
    width: 100%;
    height: 6rem;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
    color: white;
  }
`;

const AdBlock = styled(Responsive)`
  display: flex;
  align-items: center;
  height: 100%;
  .eatDeal {
    font-size: 1.4rem;
    font-weight: 600;
    span {
      z-index: 1;
      position: relative;
      &:before {
        content: '';
        z-index: -1;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 10px;
        background: rgba(102, 217, 232, 0.9);
        @media (max-width: 768px) {
          background: transparent;
        }
      }
    }
  }
  @media (max-width: 768px) {
    background: #5acbc7;
  }
`;

const smaple = [
  {
    id: 1,
    thumb:
      'https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20190623074633_photo1_a8KtahP0JSRT.jpg',
    title: '달콩카페',
    location: '성균관대역 118m',
    category: '카페',
    views: 5449,
    reviews: 13,
    rating: 4.3,
    waiting: false,
  },
  {
    id: 2,
    thumb:
      'https://mp-seoul-image-production-s3.mangoplate.com/added_restaurants/52193_1488438243054735.jpg',
    title: '아이엠바리스타',
    location: '율전동 483m',
    category: 'bar, 카페',
    views: 3490,
    reviews: 9,
    rating: 3.9,
    waiting: true,
    waitCnt: 3,
  },
  {
    id: 3,
    thumb:
      'https://mp-seoul-image-production-s3.mangoplate.com/819837_1509504944362416.jpg',
    title: '나이트티',
    location: '수원 871m',
    category: '마카롱, 카페',
    views: 3449,
    reviews: 21,
    rating: 3.1,
    waiting: true,
    waitCnt: 0,
  },
];

const HomeContainer = () => {
  const [popular, setPopular] = useState(smaple);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <HeaderContainer />
      <Container>
        <div className="title">
          <span>솔직한 리뷰, 믿을 수 있는 평점!</span>
          <span>피그테이블</span>
          <form>
            <input type="text" placeholder="키워드로 검색해 보세요." />
            <MdSearch />
          </form>
        </div>
        <div className="ad">
          <AdBlock>
            <div className="eatDeal">
              EAT딜 <span>최대 50%</span> 할인!
            </div>
          </AdBlock>
        </div>
      </Container>
      <HomePresenter popular={popular} loading={loading} />
    </>
  );
};

export default HomeContainer;
