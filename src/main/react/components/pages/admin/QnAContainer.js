import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listRestaurants } from '../../../modules/adminRestaurants';
import AdminHeader from './AdminHeader';
import MenuNavi from './MenuNavi';
import styled from 'styled-components';
import RestaurantApplyList from './restaurant/RestaurantApplyList';
import RestaurantDelList from './restaurant/RestaurantDelList';
import QnaCategories from './qna/QnaCategories';
import QnaResApplyList from './qna/QnaResApplyList';

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

  const [category, setCategory] = useState('applyRes');
  const onSelect = useCallback(category => setCategory(category), []);

  return (
    <>
      <AdminHeader />
      <BodyHeight>
        <MenuNavi subTitle="문의 내역" />
        <Categories>
          <QnaCategories category={category} onSelect={onSelect} />
        </Categories>
        {/* 카테고리별로 컴포넌트 불러오기 */}
        {category === 'applyRes' && (
          <QnaResApplyList
            loading={loading}
            error={error}
            restaurants={restaurants}
          />
        )}
        {category === 'closeRes' && (
          <RestaurantApplyList
            loading={loading}
            error={error}
            restaurants={restaurants}
          />
        )}
      </BodyHeight>
    </>
  );
};

export default QnAContainer;
