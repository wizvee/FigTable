import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import { takeLatest, put, call } from 'redux-saga/effects';
import { initializeForm } from './auth';
import { increaseLikes, decreaseLikes } from './restaurant';
import * as memberAPI from '../lib/api/member';

const SET_MEMBER = 'member/SET_MEMBER';
const LOGOUT = 'member/LOGOUT';

const [LIKES_RES, LIKES_RES_SUCCESS] = createRequestActionTypes(
  'member/LIKES_RES',
);
const [UNLIKES_RES, UNLIKES_RES_SUCCESS] = createRequestActionTypes(
  'member/UNLIKES_RES',
);
const [GET_LIKES, GET_LIKES_SUCCESS] = createRequestActionTypes(
  'member/GET_LIKES',
);

export const setMember = createAction(SET_MEMBER, member => member);
export const logout = createAction(LOGOUT);

export const likesRes = createAction(LIKES_RES, ({ member, restaurant }) => ({
  memNo: member.memNo,
  resNo: restaurant.resNo,
}));
export const unlikesRes = createAction(
  UNLIKES_RES,
  ({ member, restaurant }) => ({
    memNo: member.memNo,
    resNo: restaurant.resNo,
  }),
);
export const getLikes = createAction(GET_LIKES, memNo => memNo);

// 사가 생성
function* likesResSaga({ payload }) {
  try {
    const resp = yield call(memberAPI.likesRes, payload);
    yield put({ type: LIKES_RES_SUCCESS, payload: resp.data });
    yield put(increaseLikes());
  } catch (e) {
    console.log(e);
  }
}
function* unlikesResSaga({ payload }) {
  try {
    const resp = yield call(memberAPI.unlikesRes, payload);
    yield put({ type: UNLIKES_RES_SUCCESS, payload: resp.data });
    yield put(decreaseLikes());
  } catch (e) {
    console.log(e);
  }
}
const getLikesSaga = createRequestSaga(GET_LIKES, memberAPI.getLikes);
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
  yield takeLatest(LIKES_RES, likesResSaga);
  yield takeLatest(UNLIKES_RES, unlikesResSaga);
  yield takeLatest(GET_LIKES, getLikesSaga);
}

const initialState = {
  member: null,
  likes: [],
};

export default handleActions(
  {
    [SET_MEMBER]: (state, { payload: member }) => ({
      ...state,
      member,
    }),
    [LOGOUT]: () => initialState,
    [LIKES_RES_SUCCESS]: (state, { payload: likes }) => ({
      ...state,
      likes,
    }),
    [UNLIKES_RES_SUCCESS]: (state, { payload: likes }) => ({
      ...state,
      likes,
    }),
    [GET_LIKES_SUCCESS]: (state, { payload: likes }) => ({
      ...state,
      likes,
    }),
  },
  initialState,
);
