import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as ownerAPI from '../lib/api/adminOwners';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';

const [
  LIST_OWNERS,
  LIST_OWNERS_SUCCESS,
  LIST_OWNERS_FAILURE,
] = createRequestActionTypes('adminOwners/LIST_OWNERS');

const [APPLY_OWNER, APPLY_OWNER_SUCCESS] = createRequestActionTypes(
  'adminOwners/APPLY_OWNER',
);
const [RETURN_OWNER, RETURN_OWNER_SUCCESS] = createRequestActionTypes(
  'adminOwners/RETURN_OWNER',
);
const CHANGE_FIELD = 'adminOwners/CHANGE_FILED';

export const listOwners = createAction(LIST_OWNERS);
export const applyOwner = createAction(APPLY_OWNER, adminOwner => adminOwner);
//export const returnOwner = createAction(RETURN_OWNER, adminOwner => adminOwner);
export const returnOwner = createAction(
  RETURN_OWNER,
  ({ resNo, ownNo, ownReturn, ownApply }) => ({
    resNo,
    ownNo,
    ownReturn,
    ownApply,
  }),
);

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));

const listOwnersSaga = createRequestSaga(LIST_OWNERS, ownerAPI.getByApply);
const applyOwnerSaga = createRequestSaga(APPLY_OWNER, ownerAPI.applyOwner);
const returnOwnerSaga = createRequestSaga(RETURN_OWNER, ownerAPI.returnOwner);

export function* adminOwnersSaga() {
  yield takeLatest(LIST_OWNERS, listOwnersSaga);
  yield takeLatest(APPLY_OWNER, applyOwnerSaga);
  yield takeLatest(RETURN_OWNER, returnOwnerSaga);
}

const initialState = {
  returnOwner: {
    resNo: '',
    ownNo: '',
    ownReturn: '',
    ownApply: '',
  },
  owners: '',
  adminOwner: '',
  error: null,
};

const adminOwners = handleActions(
  {
    [LIST_OWNERS_SUCCESS]: (state, { payload: owners }) => ({
      ...state,
      owners,
    }),
    [LIST_OWNERS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, draft => {
        draft.adminOwner[key] = value;
      }),
    [APPLY_OWNER_SUCCESS]: (state, { payload: adminOwner }) =>
      produce(state, draft => {
        draft.adminOwner = adminOwner;
      }),
    [RETURN_OWNER_SUCCESS]: (state, { payload: returnOwner }) =>
      produce(state, draft => {
        draft.returnOwner = returnOwner;
      }),
  },
  initialState,
);

export default adminOwners;
