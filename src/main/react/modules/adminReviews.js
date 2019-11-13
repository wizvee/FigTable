import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as revAPI from '../lib/api/adminReview';
import { takeLatest } from 'redux-saga/effects';

const [
  LIST_REVIEWS,
  LIST_REVIEWS_SUCCESS,
  LIST_REVIEWS_FAILURE,
] = createRequestActionTypes('adminReview/LIST_REVIEWS');

export const listReviews = createAction(LIST_REVIEWS);

const listReviewsSaga = createRequestSaga(LIST_REVIEWS, revAPI.getReview);

export function* adminReviewsSaga() {
  yield takeLatest(LIST_REVIEWS, listReviewsSaga);
}

const initialState = {
  reviews: null,
  error: null,
};

const adminReviews = handleActions(
  {
    [LIST_REVIEWS_SUCCESS]: (state, { payload: reviews }) => ({
      ...state,
      reviews,
    }),
    [LIST_REVIEWS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default adminReviews;
