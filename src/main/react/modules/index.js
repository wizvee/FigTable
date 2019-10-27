import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import recent, { recentSaga } from './recent';
import auth, { authSaga } from './auth';

const rootReducer = combineReducers({ recent, auth });

export function* rootSaga() {
  yield all([recentSaga(), authSaga()]);
}

export default rootReducer;
