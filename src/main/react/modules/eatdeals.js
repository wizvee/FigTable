import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as restAPI from '../lib/api/eatdeal';
import { takeLatest } from 'redux-saga/effects';

const [LIST_EAT, LIST_EAT_SUCCESS, LIST_EAT_FAILURE] = createRequestActionTypes(
  'eatdeals/LIST_EAT',
);
const UNLOAD_EAT = 'eatdeals/UNLOAD_EAT'; // 상세 페이지에서 벗어날 때 데이터 비우기

export const listEat = createAction(LIST_EAT);
export const unloadEat = createAction(UNLOAD_EAT);

const listEatSaga = createRequestSaga(LIST_EAT, restAPI.getEatdeals);
export function* eatdealsSaga() {
  yield takeLatest(LIST_EAT, listEatSaga);
}
const initialState = {
  eatdeals: null,
  error: null,
};

const eatdeals = handleActions(
  {
    [LIST_EAT_SUCCESS]: (state, { payload: eatdeals }) => ({
      ...state,
      eatdeals,
    }),
    [LIST_EAT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_EAT]: () => initialState,
  },
  initialState,
);
console.log('모듈잇딜');
console.log('잇딜'+eatdeals.eatdeals);

export default eatdeals;
