import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import produce, { produceWithPatches } from 'immer';
import * as restAPI from '../lib/api/ownerRestaurant';
import { takeLatest } from 'redux-saga/effects';

const [
  OWNER_RES,
  OWNER_RES_SUCCESS,
  OWNER_RES_FAILURE,
] = createRequestActionTypes('owner/OWNER_RES');
const CHANGE_FIELD = 'owner/CHANGE_FILED';
const CHANGE_ARRAY = 'owner/CHANGE_ARRAY';
const REMOVE_ARRAY = 'owner/REMOVE_ARRAY';
const [UPDATE_THUMB, UPDATE_THUMB_SUCCESS] = createRequestActionTypes(
  'owner/UPDATE_THUMB',
);
const [RES_OPEN, RES_OPEN_SUCCESS] = createRequestActionTypes('owner/RES_OPEN');
const [EDIT_RES, EDIT_RES_SUCCESS] = createRequestActionTypes('owner/EDIT_RES');
const SEL_ADDR = 'owner/SEL_ADDR';

export const ownerRes = createAction(OWNER_RES, resNo => resNo);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const changeArray = createAction(
  CHANGE_ARRAY,
  ({ name, index, value }) => ({
    name,
    index,
    value,
  }),
);
export const removeArray = createAction(REMOVE_ARRAY, ({ type, index }) => ({
  type,
  index,
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
export const selAddr = createAction(
  SEL_ADDR,
  ({ resAddress, resLat, resLong }) => ({
    resAddress,
    resLat,
    resLong,
  }),
);
export const editRes = createAction(EDIT_RES, ownRestaurant => ownRestaurant);

const ownerSaga = createRequestSaga(OWNER_RES, restAPI.getOwnerRes);
const thumbSaga = createRequestSaga(UPDATE_THUMB, restAPI.updateThumb);
const openSaga = createRequestSaga(RES_OPEN, restAPI.updateOpen);
const editSaga = createRequestSaga(EDIT_RES, restAPI.updateRes);

export function* ownerResSaga() {
  yield takeLatest(OWNER_RES, ownerSaga);
  yield takeLatest(UPDATE_THUMB, thumbSaga);
  yield takeLatest(RES_OPEN, openSaga);
  yield takeLatest(EDIT_RES, editSaga);
}

const initialState = {
  ownRestaurant: '',
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
        draft.ownRestaurant[key] = value;
      }),
    [CHANGE_ARRAY]: (state, { payload: target }) =>
      produce(state, draft => {
        const { name, index, value } = target;
        draft.ownRestaurant[name][index] = value;
      }),
    [REMOVE_ARRAY]: (state, { payload: { type, index } }) =>
      produce(state, draft => {
        if (type == 'menu') {
          draft.ownRestaurant['resMenuTitle'] = draft.ownRestaurant[
            'resMenuTitle'
          ].filter((m, i) => i !== index);
          draft.ownRestaurant['resMenuPrice'] = draft.ownRestaurant[
            'resMenuPrice'
          ].filter((m, i) => i !== index);
        } else {
          draft.ownRestaurant['resOpenDay'] = draft.ownRestaurant[
            'resOpenDay'
          ].filter((m, i) => i !== index);
          draft.ownRestaurant['resCloseTime'] = draft.ownRestaurant[
            'resCloseTime'
          ].filter((m, i) => i !== index);
        }
      }),
    [RES_OPEN]: (state, { payload: { resNo, open } }) =>
      produce(state, draft => {
        draft.ownRestaurant.open = open;
      }),
    [SEL_ADDR]: (state, { payload: { resAddress, resLat, resLong } }) =>
      produce(state, draft => {
        draft.ownRestaurant.resAddress = resAddress;
        draft.ownRestaurant.resLat = resLat;
        draft.ownRestaurant.resLong = resLong;
      }),
    [EDIT_RES_SUCCESS]: (state, { payload: ownRestaurant }) =>
      produce(state, draft => {
        draft.ownRestaurant = ownRestaurant;
      }),
  },
  initialState,
);

export default ownerRestaurant;
