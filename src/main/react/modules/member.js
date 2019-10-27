import { createAction, handleActions } from 'redux-actions';
import { takeLatest, put } from 'redux-saga/effects';
import { initializeForm } from './auth';

const SET_MEMBER = 'member/SET_MEMBER';
const LOGOUT = 'member/LOGOUT';

export const setMember = createAction(SET_MEMBER, member => member);
export const logout = createAction(LOGOUT);

function* logoutSaga() {
  try {
    yield put(initializeForm());
    yield sessionStorage.removeItem('member');
  } catch (e) {
    console.log(e);
  }
}

export function* memberSaga() {
  yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
  member: null,
};

export default handleActions(
  {
    [SET_MEMBER]: (state, { payload: member }) => ({
      ...state,
      member,
    }),
    [LOGOUT]: () => initialState,
  },
  initialState,
);
