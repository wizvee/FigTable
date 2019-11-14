import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import produce from 'immer';
import * as restAPI from '../lib/api/ownerRestaurant';
import { takeLatest } from 'redux-saga/effects';

const [
  OWNER_RES,
  OWNER_RES_SUCCESS,
  OWNER_RES_FAILURE,
] = createRequestActionTypes('owner/OWNER_RES');
const CHANGE_FIELD = 'owner/CHANGE_FILED';
const [UPDATE_THUMB, UPDATE_THUMB_SUCCESS] = 'owner/UPDATE_THUMB';
const [RES_OPEN, RES_OPEN_SUCCESS] = 'owner/RES_OPEN';

export const ownerRes = createAction(OWNER_RES, resNo => resNo);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const updateThumb = createAction(
  UPDATE_THUMB,
  ({ resNo, resThumb }) => ({
    resNo,
    resThumb,
  }),
);
export const resOpen = createAction(RES_OPEN, { resNo });

const ownerSaga = createRequestSaga(OWNER_RES, restAPI.getOwnerRes);
const thumbSaga = createRequestSaga(UPDATE_THUMB, restAPI.updateThumb);
export function* ownerResSaga() {
  yield takeLatest(OWNER_RES, ownerSaga);
  yield takeLatest(UPDATE_THUMB, thumbSaga);
}

const initialState = {
  ownRestaurant: null,
  error: null,
  resNo: '',
  resThumb: '',
  open: false,
};

const ownerRestaurant = handleActions(
  {
    [OWNER_RES_SUCCESS]: (state, { payload: ownRestaurant }) => ({
      ...state,
      ownRestaurant,
    }),
    [OWNER_RES_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, draft => {
        draft[key] = value;
      }),
    [UPDATE_THUMB]: (state, { payload: { resNo, resThumb } }) => ({
      ...state,
      resNo,
      resThumb,
    }),
    [UPDATE_THUMB_SUCCESS]: (state, { payload: { result } }) => ({
      ...state,
      result,
    }),
  },
  initialState,
);

export default ownerRestaurant;
