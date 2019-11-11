import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import guest, { guestSaga } from './guest';
import auth, { authSaga } from './auth';
import loading from './loading';
import member, { memberSaga } from './member';
import restaurant, { restaurantSaga } from './restaurant';
import restaurants, { restaurantsSaga } from './restaurants';
import reviews, { reviewsSaga } from './reviews';
import review, { reviewSaga } from './review';
import eatdeals, { eatdealsSaga } from './eatdeals';
import ownerMain, { ownerMainSaga } from './owner';

const rootReducer = combineReducers({
  guest,
  auth,
  loading,
  member,
  restaurant,
  restaurants,
  review,
  reviews,
  eatdeals,
  ownerMain
});

export function* rootSaga() {
  yield all([
    guestSaga(),
    authSaga(),
    memberSaga(),
    restaurantSaga(),
    restaurantsSaga(),
    reviewSaga(),
    reviewsSaga(),
    reviewsSaga(),
    eatdealsSaga(),
    ownerMainSaga(),
  ]);
}

export default rootReducer;
