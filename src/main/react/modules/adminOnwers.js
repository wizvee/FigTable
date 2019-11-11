import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as ownerAPI from '../lib/api/adminOwners';
import { takeLatest } from 'redux-saga/effects';

const [
  LIST_OWNERS,
  LIST_OWNERS_SUCCESS,
  LIST_OWNERS_FAILURE,
] = createRequestActionTypes('adminOwners/LIST_OWNERS');

export const listOwners = createAction(LIST_OWNERS);

const listOwnersSaga = createRequestSaga(LIST_OWNERS, ownerAPI.getByApply);

export function* adminOwnersSaga() {
  yield takeLatest(LIST_OWNERS, listOwnersSaga);
}

const initialState = {
  owners: null,
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
  },
  initialState,
);

export default adminOwners;
