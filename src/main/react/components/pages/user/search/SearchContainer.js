import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import HeaderContainer from '../../../common/HeaderContainer';
import SearchPresenter from './SearchPresenter';
import { listRes } from '../../../../modules/restaurants';

const SearchContainer = ({ match }) => {
  // url에서 param 가져오기
  const { keyword } = match.params;
  // redux store
  const dispatch = useDispatch();
  const { restaurants, error, loading } = useSelector(
    ({ restaurants, loading }) => ({
      restaurants: restaurants.restaurants,
      error: restaurants.error,
      loading: loading['restaurant/LIST_RES'],
    }),
  );

  // 최초 마운트 시 검색 키워드로 DB검색 결과 반영
  useEffect(() => {
    dispatch(listRes(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <HeaderContainer />
      <SearchPresenter
        keyword={keyword}
        restaurants={restaurants}
        error={error}
        loading={loading}
      />
    </>
  );
};

export default withRouter(SearchContainer);
