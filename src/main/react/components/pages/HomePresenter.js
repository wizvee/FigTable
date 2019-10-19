import React from 'react';
import styled from 'styled-components';
import path from '../Path';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/Palette';
import { MdSearch } from 'react-icons/md';

const HomeHeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 31rem;
  background: url(${path}/images/title.png);
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

const HomeSectionBlock = styled(Responsive)`
  padding-top: 2rem;
  height: 1000px;
`;

const HomePresenter = () => {
  return (
    <>
      <HomeHeaderBlock>
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
      </HomeHeaderBlock>
      <HomeSectionBlock>맛집리스트</HomeSectionBlock>
    </>
  );
};

export default HomePresenter;
