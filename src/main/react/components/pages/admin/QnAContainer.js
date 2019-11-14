import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listRestaurants } from '../../../modules/adminRestaurants';
import AdminHeader from './AdminHeader';
import MenuNavi from './MenuNavi';
import styled from 'styled-components';
import RestaurantApplyList from './restaurant/RestaurantApplyList';
import RestaurantDelList from './restaurant/RestaurantDelList';
import QnaCategories from './qna/QnaCategories';

const BodyHeight = styled.div`
  height: 'auto';
  min-height: 490px;
`;

const Categories = styled.div`
  margin-top: 5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const QnAContainer = () => {
  const dispatch = useDispatch();
  const { restaurants, error, loading } = useSelector(
    ({ adminRestaurants, loading }) => ({
      restaurants: adminRestaurants.restaurants,
      error: adminRestaurants.error,
      loading: loading['adminRestaurants/LIST_RESTAURANTS'],
    }),
  );

  useEffect(() => {
    dispatch(listRestaurants());
  }, [dispatch]);

  const [searchKeyword, setSearchKeyword] = useState('');

  const [category, setCategory] = useState('applyRes');
  const onSelect = useCallback(category => setCategory(category), []);

  const input = useRef(null);

  const onSubmit = e => {
    e.preventDefault();
    setSearchKeyword(input.current.value);
  };

  const onReset = e => {
    e.preventDefault();
    setSearchKeyword('');
    input.current.value = '';
  };

  return (
    <>
      <AdminHeader />
      <BodyHeight>
        <MenuNavi
          subTitle="문의 내역"
          onSubmit={onSubmit}
          input={input}
          onReset={onReset}
        />
        <Categories>
          <QnaCategories category={category} onSelect={onSelect} />
        </Categories>
        {/* 카테고리별로 컴포넌트 불러오기 */}
        {category === 'applyRes' && (
          <RestaurantApplyList
            loading={loading}
            error={error}
            keyword={searchKeyword}
            restaurants={restaurants}
          />
        )}
        {category === 'closeRes' && (
          <RestaurantApplyList
            loading={loading}
            error={error}
            keyword={searchKeyword}
            restaurants={restaurants}
          />
        )}
      </BodyHeight>
    </>
  );
};

export default QnAContainer;
