import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as restAPI from '../lib/api/restaurant';
import { takeLatest } from 'redux-saga/effects';

const [READ_RES, READ_RES_SUCCESS, READ_RES_FAILURE] = createRequestActionTypes(
  'restaurant/READ_RES',
);
const UNLOAD_RES = 'restaurant/UNLOAD_RES'; // 상세 페이지에서 벗어날 때 데이터 비우기
// 일시적 client-side-rendering
const INCREASE_LIKES = 'restaurant/INCREASE_LIKES';
const DECREASE_LIKES = 'restaurant/DECREASE_LIKES';

export const readRes = createAction(READ_RES, resNo => resNo);
export const unloadRes = createAction(UNLOAD_RES);
export const increaseLikes = createAction(INCREASE_LIKES);
export const decreaseLikes = createAction(DECREASE_LIKES);

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
    [INCREASE_LIKES]: state =>
      produce(state, draft => {
        draft.restaurant.resLikes = draft.restaurant.resLikes + 1;
      }),
    [DECREASE_LIKES]: state =>
      produce(state, draft => {
        draft.restaurant.resLikes = draft.restaurant.resLikes - 1;
      }),
  },
  initialState,
);

export default restaurant;
