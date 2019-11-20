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
const [DELETE_WT, DELETE_WT_SUCCESS] = createRequestActionTypes(
  'waiting/DELETE_WT',
);
const [GET_WAITINGS, GET_WAITINGS_SUCCESS] = createRequestActionTypes(
  'waiting/GET_WAITINGS',
);
const [COMPLETE, COMPLETE_SUCCESS] = createRequestActionTypes(
  'waiting/COMPLETE',
);

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

export const complete = createAction(COMPLETE, wtNo => wtNo);
export const deleteWt = createAction(DELETE_WT, wtNo => wtNo);
export const getWaitings = createAction(GET_WAITINGS, resNo => resNo);

const registerSaga = createRequestSaga(REGISTER, restAPI.register);
const deleteSaga = createRequestSaga(DELETE_WT, restAPI.deleteWt);
const getSaga = createRequestSaga(GET_WAITINGS, restAPI.getWaitings);
const comSaga = createRequestSaga(COMPLETE, restAPI.complete);

export function* ownerWaitingSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(DELETE_WT, deleteSaga);
  yield takeLatest(GET_WAITINGS, getSaga);
  yield takeLatest(COMPLETE, comSaga);
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
  wtSuccess: false,
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
        draft.wtSuccess = true;
      }),
    [DELETE_WT_SUCCESS]: (state, { payload: wtNo }) =>
      produce(state, draft => {
        draft.waitings = draft.waitings.filter(wait => wait.wtNo != wtNo);
      }),
    [GET_WAITINGS_SUCCESS]: (state, { payload: waitings }) => ({
      ...state,
      waitings,
    }),
    [COMPLETE_SUCCESS]: (state, { payload: wtNo }) =>
      produce(state, draft => {
        draft.waitings = draft.waitings.filter(wait => wait.wtNo != wtNo);
      }),
  },
  initialState,
);

export default waiting;
