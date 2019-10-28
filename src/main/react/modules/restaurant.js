import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as restAPI from '../lib/api/restaurant';
import { takeLatest } from 'redux-saga/effects';

const [READ_RES, READ_RES_SUCCESS, READ_RES_FAILURE] = createRequestActionTypes(
  'restaurant/READ_RES',
);
const UNLOAD_RES = 'restaurant/UNLOAD_RES'; // 상세 페이지에서 벗어날 때 데이터 비우기

export const readRes = createAction(READ_RES, resNo => resNo);
export const unloadRes = createAction(UNLOAD_RES);

const readResSaga = createRequestSaga(READ_RES, restAPI.getById);
export function* restaurantSaga() {
  yield takeLatest(READ_RES, readResSaga);
}

const initialState = {
  restaurant: null,
  error: null,
};

const restaurant = handleActions(
  {
    [READ_RES_SUCCESS]: (state, { payload: restaurant }) => ({
      ...state,
      restaurant,
    }),
    [READ_RES_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_RES]: () => initialState,
  },
  initialState,
);

export default restaurant;
