import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listRestaurants } from '../../../../modules/adminRestaurants';
import ApplyRestaurantList from './ApplyRestaurantList';
import styled from 'styled-components';
import '../TableStyle.css';

const BodyHeight = styled.div`
  height: 'auto';
  min-height: 500px;
`;

const ApplyResContainer = () => {
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

  return (
    <>
      <BodyHeight>
        <ApplyRestaurantList
          loading={loading}
          error={error}
          restaurants={restaurants}
        />
      </BodyHeight>
    </>
  );
};

export default ApplyResContainer;
