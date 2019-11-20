import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as restAPI from '../lib/api/waiting';
import { takeLatest } from 'redux-saga/effects';

const [REGISTER, REGISTER_SUCCESS] = createRequestActionTypes(
  'waiting/REGISTER',
);
const INITIALIZE_FORM = 'waiting/INITIALIZE_FORM';
const CHANGE_FIELD = 'waiting/CHANGE_FIELD';
const [DELETE_WT, DELETE_WT_SUCCESS] = 'waiting/DELETE_WT';

export const register = createAction(
  REGISTER,
  ({ wtName, resNo, wtPeople, wtPhone }) => ({
    wtName,
    resNo,
    wtPeople,
    wtPhone,
  }),
);

export const initializeForm = createAction(INITIALIZE_FORM, type => type);

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));

export const deleteWt = createAction(DELETE_WT, wtNo => wtNo);

const registerSaga = createRequestSaga(REGISTER, restAPI.register);
const deleteSaga = createRequestSaga(DELETE_WT, restAPI.delete);

export function* ownerWaitingSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(DELETE_WT, deleteSaga);
}

const initialState = {
  waiting: {
    wtNo: '',
    memNo: '',
    wtName: '',
    resNo: '',
    wtPeople: 0,
    wtTime: '',
    wtPhone: '',
    wtStatus: '',
  },
  waitings: [],
};

const waiting = handleActions(
  {
    [INITIALIZE_FORM]: (state, { payload: type }) => ({
      ...state,
      [type]: initialState[type],
    }),
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, draft => {
        draft['waiting'][key] = value;
      }),
    [REGISTER_SUCCESS]: (state, { payload: waiting }) =>
      produce(state, draft => {
        draft.waitings.push(waiting);
      }),
    [DELETE_WT_SUCCESS]: (state, { payload: wtNo }) =>
      produce(state, draft => {
        draft.waitings = draft.waitings.filter(wait => wait.wtNo != wtNo);
      }),
  },
  initialState,
);

export default waiting;
