import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as restAPI from '../lib/api/adminRestaurants';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';

//매장 신청 리스트
const [
  LIST_RESTAURANTS,
  LIST_RESTAURANTS_SUCCESS,
  LIST_RESTAURANTS_FAILURE,
] = createRequestActionTypes('adminRestaurants/LIST_RESTAURANTS');

//등록 완료된 매장 리스트(폐업 전환용)
const [
  LIST_COM_RES,
  LIST_COM_RES_SUCCESS,
  LIST_COM_RES_FAILURE,
] = createRequestActionTypes('adminRestaurants/LIST_COM_RES');

const UNLOAD_RES = 'adminRestaurants/UMLOAD_RES';

const [CLOSE_RES, CLOSE_RES_SUCCESS] = createRequestActionTypes(
  'adminRestaurants/CLOSE_RES',
);

export const listRestaurants = createAction(LIST_RESTAURANTS);
export const listComRes = createAction(LIST_COM_RES);
export const unloadRes = createAction(UNLOAD_RES);
export const closeRes = createAction(CLOSE_RES, resNo => resNo);

const listRestaurantsSaga = createRequestSaga(
  LIST_RESTAURANTS,
  restAPI.getByApply,
);
const closeResSaga = createRequestSaga(CLOSE_RES, restAPI.closeRes);
const listComResSaga = createRequestSaga(LIST_COM_RES, restAPI.getResList);
export function* adminRestuarantsSaga() {
  yield takeLatest(LIST_RESTAURANTS, listRestaurantsSaga);
  yield takeLatest(LIST_COM_RES, listComResSaga);
  yield takeLatest(CLOSE_RES, closeResSaga);
}

const initialState = {
  restaurants: null,
  error: null,
};

const adminRestaurants = handleActions(
  {
    [LIST_RESTAURANTS_SUCCESS]: (state, { payload: restaurants }) => ({
      ...state,
      restaurants,
    }),
    [LIST_RESTAURANTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [LIST_COM_RES_SUCCESS]: (state, { payload: restaurants }) => ({
      ...state,
      restaurants,
    }),
    [LIST_COM_RES_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CLOSE_RES_SUCCESS]: (state, { payload: resNo }) =>
      produce(state, draft => {
        draft.restaurants = draft.restaurants.filter(res => res.resNo != resNo);
      }),
    [UNLOAD_RES]: () => initialState,
  },
  initialState,
);

export default adminRestaurants;
