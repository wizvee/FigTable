import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as reviewAPI from '../lib/api/review';
import { takeLatest } from 'redux-saga/effects';

const [LIST_RV, LIST_RV_SUCCESS, LIST_RV_FAILURE] = createRequestActionTypes(
  'reviews/LIST_RV',
);
const UNLOAD_RV = 'reviews/UNLOAD_RV';
const INCREASE_LOVES = 'reviews/INCREASE_LOVES';
const DECREASE_LOVES = 'reviews/DECREASE_LOVES';

export const listReviews = createAction(LIST_RV, resNo => resNo);
export const unloadReviews = createAction(UNLOAD_RV);
export const increaseLoves = createAction(INCREASE_LOVES, rvNo => rvNo);
export const decreaseLoves = createAction(DECREASE_LOVES, rvNo => rvNo);

const listReviewsSaga = createRequestSaga(LIST_RV, reviewAPI.getByResNo);
export function* reviewsSaga() {
  yield takeLatest(LIST_RV, listReviewsSaga);
}

const initialState = {
  reviews: [],
  error: null,
};

const reviews = handleActions(
  {
    [LIST_RV_SUCCESS]: (state, { payload: reviews }) => ({
      ...state,
      reviews,
    }),
    [LIST_RV_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_RV]: () => initialState,
  },
  initialState,
);

export default reviews;
