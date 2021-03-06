import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';
import HomePresenter from './HomePresenter';
import Responsive from '../../common/Responsive';
import palette from '../../../lib/styles/Palette';
import HeaderContainer from '../../common/HeaderContainer';
import { listRes, unloadRes } from '../../../modules/restaurants';
import NaviContainer from './NaviContainer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: calc(29rem - 35.2px);
  background: url(${process.env.PATH}/resources/images/title.png);
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
    @media (max-width: 426px) {
      font-size: 1.5rem;
    }
    form {
      position: relative;
      margin-top: 2rem;
      width: 320px;
      input {
        padding: 0.5rem 1.5rem;
        width: 100%;
        border: 3px solid ${palette.primary};
        border-radius: 1.5rem;
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
    height: 5rem;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
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
    cursor: pointer;
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

const HomeContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { position, restaurants, error, loading } = useSelector(
    ({ guest, restaurants, loading }) => ({
      position: guest.position,
      restaurants: restaurants.restaurants,
      error: restaurants.error,
      loading: loading['restaurant/LIST_RES'],
    }),
  );

  const [keyword, setKeyword] = useState('');
  // search input event handler
  const onChange = useCallback(({ target: { value } }) => {
    setKeyword(value);
  }, []);
  // 검색 submit event handler
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      document.body.style.overflow = 'unset';
      history.push(`${process.env.PATH}/search/${keyword}`);
    },
    [keyword],
  );

  // 마운트 시 GPS 기준으로 레스토랑 리스트 가져오기
  useEffect(() => {
    if (position)
      dispatch(
        listRes({
          lat: position.lat,
          lon: position.lon,
          searchKey: position.searchKey,
        }),
      );
    else
      dispatch(
        listRes({
          lat: 37.498203,
          lon: 127.027725,
          searchKey: '서울특별시',
        }),
      );
    // 언마운트 시 스토어에서 레스토랑 리스트 데이터 없애기
    return () => dispatch(unloadRes());
  }, [position]);

  return (
    <>
      <HeaderContainer />
      <Container>
        <div className="title">
          <span>솔직한 리뷰, 믿을 수 있는 평점!</span>
          <span>피그테이블</span>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={keyword}
              onChange={onChange}
              placeholder="키워드로 검색해 보세요."
            />
            <MdSearch />
          </form>
        </div>
        <div className="ad">
          <AdBlock>
            <div
              className="eatDeal"
              onClick={() => history.push(`${process.env.PATH}/eatdeal`)}
            >
              EAT딜 <span>최대 50%</span> 할인!
            </div>
          </AdBlock>
        </div>
      </Container>
      <NaviContainer />
      <HomePresenter
        restaurants={restaurants}
        error={error}
        loading={loading}
      />
    </>
  );
};

export default withRouter(React.memo(HomeContainer));
