import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import recent, { recentSaga } from './recent';

const rootReducer = combineReducers({ recent });

// export function* rootSaga() {
//   yield all([recentSaga()]);
// }

export default rootReducer;
