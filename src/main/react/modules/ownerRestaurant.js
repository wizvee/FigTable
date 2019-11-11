import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as restAPI from '../lib/api/ownerRestaurant';
import { takeLatest } from 'redux-saga/effects';

const [
  OWNER_RES,
  OWNER_RES_SUCCESS,
  OWNER_RES_FAILURE,
] = createRequestActionTypes('owner/OWNER_RES');

export const ownerRes = createAction(OWNER_RES, resNo => resNo);

const ownerSaga = createRequestSaga(OWNER_RES, restAPI.getOwnerRes);
export function* ownerResSaga() {
  yield takeLatest(OWNER_RES, ownerSaga);
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
  },
  initialState,
);

export default ownerRestaurant;
