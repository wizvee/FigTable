import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as reviewAPI from '../lib/api/review';

const SET_RES = 'review/SET_RES';
const CHANGE_FIELD = 'review/CHANGE_FIELD';
const INITIALIZE_FORM = 'review/INITIALIZE_FORM';

const [
  WRITE_REVIEW,
  WRITE_REVIEW_SUCCESS,
  WRITE_REVIEW_FAILURE,
] = createRequestActionTypes('review/WRITE_REVIEW');

export const setRes = createAction(SET_RES, ({ restaurant, member }) => ({
  restaurant,
  member,
}));
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const initializeForm = createAction(INITIALIZE_FORM);

export const writeReview = createAction(
  WRITE_REVIEW,
  ({ memNo, resNo, rvRating, rvContent, rvImages }) => ({
    memNo,
    resNo,
    rvRating,
    rvContent,
    rvImages,
  }),
);

// 사가 생성
const writeSaga = createRequestSaga(WRITE_REVIEW, reviewAPI.writeReview);
export function* reviewSaga() {
  yield takeLatest(WRITE_REVIEW, writeSaga);
}

const initialState = {
  resName: '',
  // axios
  memNo: '',
  resNo: '',
  rvRating: '',
  rvContent: '',
  rvImages: [],
  result: null,
  error: null,
};

const review = handleActions(
  {
    [SET_RES]: (state, { payload: { restaurant, member } }) =>
      produce(state, draft => {
        (draft.resNo = restaurant.resNo),
          (draft.resName = restaurant.resName),
          (draft.memNo = member.memNo);
      }),
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, draft => {
        draft[key] = value;
      }),
    [INITIALIZE_FORM]: () => initialState,
    [WRITE_REVIEW_SUCCESS]: (state, { payload: result }) => ({
      ...state,
      result,
    }),
    [WRITE_REVIEW_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default review;
