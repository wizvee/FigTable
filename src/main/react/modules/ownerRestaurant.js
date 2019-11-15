import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import produce, { produceWithPatches } from 'immer';
import * as restAPI from '../lib/api/ownerRestaurant';
import { takeLatest } from 'redux-saga/effects';
import restaurants from './restaurants';

const [
  OWNER_RES,
  OWNER_RES_SUCCESS,
  OWNER_RES_FAILURE,
] = createRequestActionTypes('owner/OWNER_RES');
const CHANGE_FIELD = 'owner/CHANGE_FILED';
const [UPDATE_THUMB, UPDATE_THUMB_SUCCESS] = createRequestActionTypes(
  'owner/UPDATE_THUMB',
);
const [RES_OPEN, RES_OPEN_SUCCESS] = createRequestActionTypes('owner/RES_OPEN');
const [EDIT_RES] = createRequestActionTypes('owner/EDIT_RES');

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
export const resOpen = createAction(RES_OPEN, ({ resNo, open }) => ({
  resNo,
  open,
}));
export const editRes = createAction(EDIT_RES, ({ resNo }) => ({ resNo }));

const ownerSaga = createRequestSaga(OWNER_RES, restAPI.getOwnerRes);
const thumbSaga = createRequestSaga(UPDATE_THUMB, restAPI.updateThumb);
const openSaga = createRequestSaga(RES_OPEN, restAPI.updateOpen);
export function* ownerResSaga() {
  yield takeLatest(OWNER_RES, ownerSaga);
  yield takeLatest(UPDATE_THUMB, thumbSaga);
  yield takeLatest(RES_OPEN, openSaga);
}

const initialState = {
  ownRestaurant: null,
  error: null,
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
        // draft.ownRestaurant.resThumb = value;
        draft.ownRestaurant[key] = value;
      }),
    [RES_OPEN]: (state, { payload: { resNo, open } }) =>
      produce(state, draft => {
        draft.ownRestaurant.open = open;
      }),
  },
  initialState,
);

export default ownerRestaurant;
