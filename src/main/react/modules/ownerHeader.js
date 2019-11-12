import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as restAPI from '../lib/api/ownerHeader';
import { takeLatest } from 'redux-saga/effects';

const [
  OWN_HEADER,
  OWN_HEADER_SUCCESS,
  OWN_HEADER_FAULURE,
] = createRequestActionTypes('owner/OWN_HEADER');

export const ownHeader = createAction(OWN_HEADER, ownNo => ownNo);

const headerSaga = createRequestSaga(OWN_HEADER, restAPI.getOwnerHeader);
export function* ownHeaderSaga() {
  yield takeLatest(OWN_HEADER, headerSaga);
}

const initialState = {
  ownerInfo: null,
  error: null,
};

const ownerHeader = handleActions(
  {
    [OWN_HEADER_SUCCESS]: (state, { payload: ownerInfo }) => ({
      ...state,
      ownerInfo,
    }),
    [OWN_HEADER_FAULURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default ownerHeader;
