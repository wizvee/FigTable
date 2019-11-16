import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as restAPI from '../lib/api/eatdeal';
import { takeLatest } from 'redux-saga/effects';

const [LIST_EAT, LIST_EAT_SUCCESS, LIST_EAT_FAILURE] = createRequestActionTypes(
  'eatdeals/LIST_EAT',
);
const[LIST_OWN_EAT, LIST_OWN_EAT_SUCCESS, LIST_OWN_EAT_FAILURE] 
= createRequestActionTypes('eatdeals/LIST_OWN_EAT',);

const[LIST_BUY_EAT,LIST_BUY_EAT_SUCCESS, LIST_BUY_EAT_FAILURE ]
= createRequestActionTypes('eatdeals/LIST_BUY_EAT',);

const[DELETE_EAT, DELETE_EAT_SUCCESS]
= createRequestActionTypes('eatdeals/DELETE_EAT',);


const UNLOAD_EAT = 'eatdeals/UNLOAD_EAT'; // 상세 페이지에서 벗어날 때 데이터 비우기

export const listEat = createAction(LIST_EAT);
export const listOwnEat = createAction(LIST_OWN_EAT, resNo => resNo);
export const listBuyEat = createAction(LIST_BUY_EAT, resNo => resNo);
export const unloadEat = createAction(UNLOAD_EAT);
export const deleteEat = createAction(DELETE_EAT, eatNo => eatNo);

const listEatSaga = createRequestSaga(LIST_EAT, restAPI.getEatdeals);
const listOwnEatSaga = createRequestSaga(LIST_OWN_EAT, restAPI.getByResNo);
const listBuyEatSaga = createRequestSaga(LIST_BUY_EAT, restAPI.getBuy);
const deleteEatSaga = createRequestSaga(DELETE_EAT, restAPI.deleteEat);
export function* eatdealsSaga() {
  yield takeLatest(LIST_EAT, listEatSaga);
  yield takeLatest(LIST_OWN_EAT, listOwnEatSaga);
  yield takeLatest(LIST_BUY_EAT, listBuyEatSaga);
  yield takeLatest(DELETE_EAT, deleteEatSaga);
}
const initialState = {
  eatdeals: null,
  ownEatdeals:null,
  buyers:null,
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
    [LIST_BUY_EAT_SUCCESS]: (state, { payload: buyers }) => ({
      ...state,
      buyers,
    }),
    [LIST_BUY_EAT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [DELETE_EAT_SUCCESS]: (state, { payload: eatdeals }) =>({
      ...state,
      eatdeals,
    }),
    [UNLOAD_EAT]: () => initialState,
  },
  initialState,
);

export default eatdeals;
