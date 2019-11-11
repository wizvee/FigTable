import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as restAPI from '../lib/api/owner';
import { takeLatest } from 'redux-saga/effects';

const [
  OWNER_MAIN,
  OWNER_MAIN_SUCCESS,
  OWNER_MAIN_FAILURE,
] = createRequestActionTypes('owner/OWNER_MAIN');

export const ownerMain = createAction(OWNER_MAIN, resNo => resNo);

const ownerSaga = createRequestSaga(OWNER_MAIN, restAPI.getOwnerMain);
export function* ownerMainSaga() {
  yield takeLatest(OWNER_MAIN, ownerSaga);
}

const initialState = {
  info: null,
  error: null,
};

const owner = handleActions(
  {
    [OWNER_MAIN_SUCCESS]: (state, { payload: info }) => ({
      ...state,
      info,
    }),
    [OWNER_MAIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default owner;
