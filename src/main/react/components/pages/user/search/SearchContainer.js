import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import HeaderContainer from '../../../common/HeaderContainer';
import SearchPresenter from './SearchPresenter';
import { searchRes } from '../../../../modules/restaurants';

const SearchContainer = ({ match }) => {
  // url에서 param 가져오기
  const { keyword } = match.params;
  // redux store
  const dispatch = useDispatch();
  const { position, restaurants, error, loading } = useSelector(
    ({ guest, restaurants, loading }) => ({
      position: guest.position,
      restaurants: restaurants.restaurants,
      error: restaurants.error,
      loading: loading['restaurant/LIST_RES'],
    }),
  );

  // 최초 마운트 시 검색 키워드로 DB검색 결과 반영
  useEffect(() => {
    dispatch(
      searchRes({
        lat: position ? position.lat : 0,
        lon: position ? position.lon : 0,
        keyword,
      }),
    );
  }, [keyword]);

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

export default withRouter(React.memo(SearchContainer));
