import { createAction, handleActions } from 'redux-actions';
import { takeLatest, put, call } from 'redux-saga/effects';
import produce from 'immer';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as reviewAPI from '../lib/api/review';

const [LIST_RV, LIST_RV_SUCCESS, LIST_RV_FAILURE] = createRequestActionTypes(
  'reviews/LIST_RV',
);
const UNLOAD_RV = 'reviews/UNLOAD_RV';
const INCREASE_LOVES = 'reviews/INCREASE_LOVES';
const DECREASE_LOVES = 'reviews/DECREASE_LOVES';
const [WRITE_COMMENT, WRITE_COMMENT_SUCCESS] = createRequestActionTypes(
  'reviews/WRITE_COMMENT',
);
const [DELETE_COMMENT, DELETE_COMMENT_SUCCESS] = createRequestActionTypes(
  'reviews/DELETE_COMMENT',
);
const WARN_REVIEW = 'reviews/WARN_REVIEW';
const [DELETE_REVIEW, DELETE_REVIEW_SUCCESS] = createRequestActionTypes(
  'reviews/DELETE_REVIEW',
);

export const listReviews = createAction(LIST_RV, resNo => resNo);
export const unloadReviews = createAction(UNLOAD_RV);
export const increaseLoves = createAction(INCREASE_LOVES, rvNo => rvNo);
export const decreaseLoves = createAction(DECREASE_LOVES, rvNo => rvNo);
export const writeComment = createAction(
  WRITE_COMMENT,
  ({ rvNoRef, memNo, rvcContent }) => ({ rvNoRef, memNo, rvcContent }),
);
export const deleteComment = createAction(
  DELETE_COMMENT,
  ({ rvNo, rvcNo }) => ({ rvNo, rvcNo }),
);
export const warnReview = createAction(WARN_REVIEW, rvNo => rvNo);
export const deleteReview = createAction(DELETE_REVIEW, ({ rvNo, memNo }) => ({
  rvNo,
  memNo,
}));

const listReviewsSaga = createRequestSaga(LIST_RV, reviewAPI.getByResNo);
const writeCommentSaga = createRequestSaga(
  WRITE_COMMENT,
  reviewAPI.writeComment,
);
function* deleteCommentSaga({ payload }) {
  try {
    const resp = yield call(reviewAPI.deleteComment, payload);
    yield put({
      type: DELETE_COMMENT_SUCCESS,
      payload: { comments: resp.data, rvNo: payload.rvNo },
    });
  } catch (e) {
    console.log(e);
  }
}
const deleteReviewSaga = createRequestSaga(
  DELETE_REVIEW,
  reviewAPI.deleteReview,
);

export function* reviewsSaga() {
  yield takeLatest(LIST_RV, listReviewsSaga);
  yield takeLatest(WRITE_COMMENT, writeCommentSaga);
  yield takeLatest(DELETE_COMMENT, deleteCommentSaga);
  yield takeLatest(DELETE_REVIEW, deleteReviewSaga);
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
    [INCREASE_LOVES]: (state, { payload: rvNo }) =>
      produce(state, draft => {
        const review = draft.reviews.find(review => review.rvNo == rvNo);
        review.rvLove += 1;
        review.loved = true;
      }),
    [DECREASE_LOVES]: (state, { payload: rvNo }) =>
      produce(state, draft => {
        const review = draft.reviews.find(review => review.rvNo == rvNo);
        review.rvLove -= 1;
        review.loved = false;
      }),
    [WRITE_COMMENT_SUCCESS]: (state, { payload: comments }) =>
      produce(state, draft => {
        const review = draft.reviews.find(
          review => review.rvNo == comments[0].rvNoRef,
        );
        review.comments = comments;
      }),
    [DELETE_COMMENT_SUCCESS]: (state, { payload: { comments, rvNo } }) =>
      produce(state, draft => {
        const review = draft.reviews.find(review => review.rvNo == rvNo);
        review.comments = comments;
      }),
    [WARN_REVIEW]: (state, { payload: rvNo }) =>
      produce(state, draft => {
        const review = draft.reviews.find(review => review.rvNo == rvNo);
        review.rvWarn = 'W';
      }),
    [DELETE_REVIEW_SUCCESS]: (state, { payload: rvNo }) =>
      produce(state, draft => {
        draft.reviews = draft.reviews.filter(review => review.rvNo != rvNo);
      }),
  },
  initialState,
);

export default reviews;
