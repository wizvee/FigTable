import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as revAPI from '../lib/api/adminReview';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';

const [
  LIST_REVIEWS,
  LIST_REVIEWS_SUCCESS,
  LIST_REVIEWS_FAILURE,
] = createRequestActionTypes('adminReview/LIST_REVIEWS');

const [REMOVE_REVIEW, REMOVE_REVIEW_SUCCESS] = createRequestActionTypes(
  'adminReview/REMOVE_REVIEW',
);

const RETURN_REVIEW = 'adminReview/RETURN_REVIEW';

export const listReviews = createAction(LIST_REVIEWS);
export const returnReview = createAction(RETURN_REVIEW, rvNo => rvNo);
export const removeReview = createAction(REMOVE_REVIEW, rvNo => rvNo);

const listReviewsSaga = createRequestSaga(LIST_REVIEWS, revAPI.getReview);

export function* adminReviewsSaga() {
  yield takeLatest(LIST_REVIEWS, listReviewsSaga);
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
    [REMOVE_REVIEW_SUCCESS]: (state, { payload: rvNo }) =>
      produce(state, draft => {
        draft.reviews = draft.reviews.filter(review => review.rvNo != rvNo);
      }),
    [RETURN_REVIEW]: (state, { payload: rvNo }) =>
      produce(state, draft => {
        draft.reviews = draft.reviews.filter(review => review.rvNo != rvNo);
      }),
  },
  initialState,
);

export default adminReviews;
