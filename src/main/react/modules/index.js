import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import recent, { recentSaga } from './recent';
import auth, { authSaga } from './auth';
import member, { memberSaga } from './member';

const rootReducer = combineReducers({ recent, auth, member });

export function* rootSaga() {
  yield all([recentSaga(), authSaga(), memberSaga()]);
}

export default rootReducer;
