import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import recent, { recentSaga } from './recent';
import auth, { authSaga } from './auth';
import loading from './loading';
import member, { memberSaga } from './member';
import restaurant, { restaurantSaga } from './restaurant';

const rootReducer = combineReducers({
  recent,
  auth,
  loading,
  member,
  restaurant,
});

export function* rootSaga() {
  yield all([recentSaga(), authSaga(), memberSaga(), restaurantSaga()]);
}

export default rootReducer;
