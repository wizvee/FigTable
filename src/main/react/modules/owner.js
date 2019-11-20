import { createAction, handleActions } from 'redux-actions';
import { takeLatest, put, call } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import { initializeForm } from './enrollOwner';
import * as restAPI from '../lib/api/owner';

const SET_OWNER = 'owner/SET_OWNER';

export const setMember = createAction(SET_OWNER, owner => owner);

const initialState = {
  owner: null,
};

export function* ownerSaga() {}

export default handleActions(
  {
    [SET_OWNER]: (state, { payload: owner }) => ({
      ...state,
      owner,
    }),
  },
  initialState,
);
