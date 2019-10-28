import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as restAPI from '../lib/api/restaurant';
import { takeLatest } from 'redux-saga/effects';

const [LIST_RES, LIST_RES_SUCCESS, LIST_RES_FAILURE] = createRequestActionTypes(
  'restaurants/LIST_RES',
);
const UNLOAD_RES = 'restaurants/UNLOAD_RES'; // 상세 페이지에서 벗어날 때 데이터 비우기

export const listRes = createAction(LIST_RES, local => local);
export const unloadRes = createAction(UNLOAD_RES);

const listResSaga = createRequestSaga(LIST_RES, restAPI.getByLocal);
export function* restaurantsSaga() {
  yield takeLatest(LIST_RES, listResSaga);
}

const initialState = {
  restaurants: null,
  error: null,
};

const restaurants = handleActions(
  {
    [LIST_RES_SUCCESS]: (state, { payload: restaurants }) => ({
      ...state,
      restaurants,
    }),
    [LIST_RES_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_RES]: () => initialState,
  },
  initialState,
);

export default restaurants;
