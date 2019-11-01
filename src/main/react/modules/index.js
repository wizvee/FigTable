import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import recent, { recentSaga } from './recent';
import auth, { authSaga } from './auth';
import loading from './loading';
import member, { memberSaga } from './member';
import restaurant, { restaurantSaga } from './restaurant';
import restaurants, { restaurantsSaga } from './restaurants';
import reviews, { reviewsSaga } from './reviews';
import review, { reviewSaga } from './review';

const rootReducer = combineReducers({
  recent,
  auth,
  loading,
  member,
  restaurant,
  restaurants,
  review,
  reviews,
});

export function* rootSaga() {
  yield all([
    recentSaga(),
    authSaga(),
    memberSaga(),
    restaurantSaga(),
    restaurantsSaga(),
    reviewSaga(),
    reviewsSaga(),
  ]);
}

export default rootReducer;
