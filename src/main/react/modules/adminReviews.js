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

const [UPDATE_REVIEW, UPDATE_REVIEW_SUCCESS] = createRequestActionTypes(
  `adminReview/UPDATE_REVIEW`,
);

export const listReviews = createAction(LIST_REVIEWS);
export const updateReview = createAction(UPDATE_REVIEW, rvNo => {
  rvNo;
});

const listReviewsSaga = createRequestSaga(LIST_REVIEWS, revAPI.getReview);
// const updateReviewSaga = createeRequestSaga(UPDATE_REVIEW, revAPI.updateReview);

export function* adminReviewsSaga() {
  yield takeLatest(LIST_REVIEWS, listReviewsSaga);
  //yield takeLatest(UPDATE_REVIEW, updateReviewSaga);
}

const initialState = {
  reviews: [],
  error: null,
  result: null,
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

    // [UPDATE_REVIEW_SUCCESS]: (state, { payload: reviews, rvNo }) => ({
    //   ...state,
    //   reviews,
    // }),
    // [UPDATE_REVIEW_FAILURE]: (state, { payload: error }) => ({
    //   ...state,
    //   error,
    // }),
  },
  initialState,
);

export default adminReviews;
