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
import eatdeal, { eatdealSaga } from './eatdeal';
import point, { pointSaga } from './point';
import newEat, { newEatSaga } from './newEat';
import ownerRes, { ownerResSaga } from './ownerRestaurant';
import ownHeader, { ownHeaderSaga } from './ownerHeader';
import adminRestaurants, { adminRestuarantsSaga } from './adminRestaurants';
import adminOwners, { adminOwnersSaga } from './adminOwners';
import adminInsertRes, { adminInsertResSaga } from './adminInsertRes';
import adminReviews, { adminReviewsSaga } from './adminReviews';
import enrollOwner, { ownerEnrollSaga } from './enrollOwner';
import owner, { ownerSaga } from './owner';

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
  eatdeal,
  point,
  newEat,
  ownerRes,
  ownHeader,
  adminRestaurants,
  adminOwners,
  adminInsertRes,
  adminReviews,
  enrollOwner,
  owner,
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
    eatdealsSaga(),
    eatdealSaga(),
    pointSaga(),
    newEatSaga(),
    ownerResSaga(),
    ownHeaderSaga(),
    adminRestuarantsSaga(),
    adminOwnersSaga(),
    adminInsertResSaga(),
    adminReviewsSaga(),
    ownerEnrollSaga(),
    ownerSaga(),
  ]);
}

export default rootReducer;
