import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';

const CHANGE_FIELD = 'review/CHANGE_FIELD';
const INITIALIZE_FORM = 'review/INITIALIZE_FORM';

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const initializeForm = createAction(INITIALIZE_FORM);

const initialState = {
  review: {
    memNo: '',
    resNo: '',
    resName: '',
    rvRating: '',
    rvContent: '',
    rvImages: [],
  },
};

const review = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, draft => {
        draft[review][key] = value;
      }),
    [INITIALIZE_FORM]: () => initialState,
  },
  initialState,
);

export default review;
