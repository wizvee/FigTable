import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listRestaurants } from '../../../modules/adminRestaurants';
import AdminHeader from './AdminHeader';
import MenuNavi from './MenuNavi';
import styled from 'styled-components';
import './TableStyle.css';
import RestaurantList from './restaurant/RestaurantList';

const BodyHeight = styled.div`
  height: 'auto';
  min-height: 500px;
`;

const TableWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 2rem;
  min-height: 465px;
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

        <TableWrapper>
          <table>
            <thead>
              <tr>
                <th>매장명</th>
                <th>매장주소</th>
                <th>전화번호</th>
                <th>대표자</th>
              </tr>
            </thead>
            <tbody>
              <RestaurantList
                loading={loading}
                error={error}
                keyword={searchKeyword}
                restaurants={restaurants}
              />
            </tbody>
          </table>
        </TableWrapper>
      </BodyHeight>
    </>
  );
};

export default QnAContainer;
