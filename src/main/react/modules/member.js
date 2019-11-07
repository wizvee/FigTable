import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import { takeLatest, put, call } from 'redux-saga/effects';
import { initializeForm } from './auth';
import { readRes } from './restaurant';
import * as memberAPI from '../lib/api/member';

const SET_MEMBER = 'member/SET_MEMBER';
const SET_MEMBER_INSERT = 'member/SET_MEMBER_INSERT';
const LOGOUT = 'member/LOGOUT';

const [CHECK, CHECK_SUCCESS] = createRequestActionTypes('member/CHECK');
const [GET_LIKES, GET_LIKES_SUCCESS] = createRequestActionTypes(
  'member/GET_LIKES',
);
const [LIKES_RES, LIKES_RES_SUCCESS] = createRequestActionTypes(
  'member/LIKES_RES',
);
const [UNLIKES_RES, UNLIKES_RES_SUCCESS] = createRequestActionTypes(
  'member/UNLIKES_RES',
);
const [GET_LOVES, GET_LOVES_SUCCESS] = createRequestActionTypes(
  'member/GET_LOVES',
);
const [LOVES_RV, LOVES_RV_SUCCESS] = createRequestActionTypes(
  'member/LOVES_RV',
);
const [UNLOVES_RV, UNLOVES_RV_SUCCESS] = createRequestActionTypes(
  'member/UNLOVES_RV',
);

const CHANGE_FIELD = 'member/CHANGE_FIELD';

export const setMember = createAction(SET_MEMBER, member => member);
export const logout = createAction(LOGOUT);
export const check = createAction(CHECK, memNo => memNo);

export const getLikes = createAction(GET_LIKES, memNo => memNo);
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

export const getLoves = createAction(GET_LOVES, memNo => memNo);
export const lovesRv = createAction(LOVES_RV, ({ member, review }) => ({
  memNo: member.memNo,
  rvNo: review.rvNo,
}));
export const unlovesRv = createAction(UNLOVES_RV, ({ member, review }) => ({
  memNo: member.memNo,
  rvNo: review.rvNo,
}));

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));

// 사가 생성
function* setMemberSaga({ payload }) {
  yield put({ type: SET_MEMBER_INSERT, payload });
  yield put({ type: GET_LIKES, payload: payload.memNo });
  yield put({ type: GET_LOVES, payload: payload.memNo });
}
function* logoutSaga() {
  try {
    yield put(initializeForm());
    yield sessionStorage.removeItem('member');
  } catch (e) {
    console.log(e);
  }
}
const checkSaga = createRequestSaga(CHECK, memberAPI.check);

const getLikesSaga = createRequestSaga(GET_LIKES, memberAPI.getLikes);
function* likesResSaga({ payload }) {
  try {
    const resp = yield call(memberAPI.likesRes, payload);
    yield put({ type: LIKES_RES_SUCCESS, payload: resp.data });
    yield put(readRes(payload.resNo));
  } catch (e) {
    console.log(e);
  }
}
function* unlikesResSaga({ payload }) {
  try {
    const resp = yield call(memberAPI.unlikesRes, payload);
    yield put({ type: UNLIKES_RES_SUCCESS, payload: resp.data });
    yield put(readRes(payload.resNo));
  } catch (e) {
    console.log(e);
  }
}

const getLovesSaga = createRequestSaga(GET_LOVES, memberAPI.getLoves);
const lovesRvSaga = createRequestSaga(LOVES_RV, memberAPI.lovesRv);
const unlovesRvSaga = createRequestSaga(UNLOVES_RV, memberAPI.unlovesRv);

export function* memberSaga() {
  yield takeLatest(SET_MEMBER, setMemberSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(CHECK, checkSaga);

  yield takeLatest(GET_LIKES, getLikesSaga);
  yield takeLatest(LIKES_RES, likesResSaga);
  yield takeLatest(UNLIKES_RES, unlikesResSaga);

  yield takeLatest(GET_LOVES, getLovesSaga);
  yield takeLatest(LOVES_RV, lovesRvSaga);
  yield takeLatest(UNLOVES_RV, unlovesRvSaga);
}

const initialState = {
  member: null,
  likes: [],
  loves: [],
};

export default handleActions(
  {
    [SET_MEMBER_INSERT]: (state, { payload: member }) => ({
      ...state,
      member,
    }),
    [LOGOUT]: () => initialState,
    [CHECK_SUCCESS]: (state, { payload: member }) => ({
      ...state,
      member,
    }),
    [GET_LIKES_SUCCESS]: (state, { payload: likes }) => ({
      ...state,
      likes,
    }),
    [LIKES_RES_SUCCESS]: (state, { payload: likes }) => ({
      ...state,
      likes,
    }),
    [UNLIKES_RES_SUCCESS]: (state, { payload: likes }) => ({
      ...state,
      likes,
    }),
    [GET_LOVES_SUCCESS]: (state, { payload: loves }) => ({
      ...state,
      loves,
    }),
    [LOVES_RV_SUCCESS]: (state, { payload: loves }) => ({
      ...state,
      loves,
    }),
    [UNLOVES_RV_SUCCESS]: (state, { payload: loves }) => ({
      ...state,
      loves,
    }),
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      member: {
        ...state.member,
        [key]: value,
      },
    }),
  },
  initialState,
);
