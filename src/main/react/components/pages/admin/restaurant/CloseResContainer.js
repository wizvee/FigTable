import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchTemplate from '../SearchTemplate';
import { listComRes } from '../../../../modules/adminRestaurants';
import CloseRestaurantList from '../restaurant/CloseRestaurantList';
import styled from 'styled-components';
import '../TableStyle.css';

const BodyHeight = styled.div`
  height: 'auto';
  min-height: 500px;
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
`;

const CloseResContainer = () => {
  const dispatch = useDispatch();
  const { restaurants, error, loading } = useSelector(
    ({ adminRestaurants, loading }) => ({
      restaurants: adminRestaurants.restaurants,
      error: adminRestaurants.error,
      loading: loading['adminRestaurants/LIST_COM_RES'],
    }),
  );

  useEffect(() => {
    dispatch(listComRes());
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
      <BodyHeight>
        <SearchWrapper>
          <SearchTemplate onSubmit={onSubmit} onReset={onReset} input={input} />
        </SearchWrapper>
        <CloseRestaurantList
          loading={loading}
          error={error}
          keyword={searchKeyword}
          restaurants={restaurants}
        />
      </BodyHeight>
    </>
  );
};

export default CloseResContainer;
