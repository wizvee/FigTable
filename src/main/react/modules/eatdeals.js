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

const[LIST_OWN_EAT, LIST_OWN_EAT_SUCCESS, LIST_OWN_EAT_FAILURE] 
= createRequestActionTypes('eatdeals/LIST_OWN_EAT',);

export const listEat = createAction(LIST_EAT);
export const listOwnEat = createAction(LIST_OWN_EAT, resNo => resNo);
export const unloadEat = createAction(UNLOAD_EAT);

const listEatSaga = createRequestSaga(LIST_EAT, restAPI.getEatdeals);
const listOwnEatSaga = createRequestSaga(LIST_OWN_EAT, restAPI.getByResNo);
export function* eatdealsSaga() {
  yield takeLatest(LIST_EAT, listEatSaga);
  yield takeLatest(LIST_OWN_EAT, listOwnEatSaga);
}
const initialState = {
  eatdeals: null,
  ownEatdeals:null,
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
     [LIST_OWN_EAT_SUCCESS]: (state, { payload: ownEatdeals }) => ({
      ...state,
      ownEatdeals,
    }),
    [LIST_OWN_EAT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_EAT]: () => initialState,
  },
  initialState,
);

export default eatdeals;
