import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import { takeLatest, put, call } from 'redux-saga/effects';
import { initializeForm } from './auth';
import * as memberAPI from '../lib/api/member';

const SET_MEMBER = 'member/SET_MEMBER';
const LOGOUT = 'member/LOGOUT';
const INITIALIZE_ITEM = 'member/INITIALIZE_ITEM';

const [CHECK, CHECK_SUCCESS] = createRequestActionTypes('member/CHECK');
const [GET_LIKES, GET_LIKES_SUCCESS] = createRequestActionTypes(
  'member/GET_LIKES',
);
const [LIKES_RES] = createRequestActionTypes('member/LIKES_RES');
const [UNLIKES_RES] = createRequestActionTypes('member/UNLIKES_RES');
const [GET_LOVES, GET_LOVES_SUCCESS] = createRequestActionTypes(
  'member/GET_LOVES',
);
const [LOVES_RV, LOVES_RV_SUCCESS] = createRequestActionTypes(
  'member/LOVES_RV',
);
const [UNLOVES_RV, UNLOVES_RV_SUCCESS] = createRequestActionTypes(
  'member/UNLOVES_RV',
);

export const setMember = createAction(SET_MEMBER, member => member);
export const logout = createAction(LOGOUT);
export const initializeItem = createAction(INITIALIZE_ITEM, key => key);

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

// 사가 생성
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
const likesResSaga = createRequestSaga(LIKES_RES, memberAPI.likesRes);
const unlikesResSaga = createRequestSaga(UNLIKES_RES, memberAPI.unlikesRes);

const getLovesSaga = createRequestSaga(GET_LOVES, memberAPI.getLoves);
const lovesRvSaga = createRequestSaga(LOVES_RV, memberAPI.lovesRv);
const unlovesRvSaga = createRequestSaga(UNLOVES_RV, memberAPI.unlovesRv);

export function* memberSaga() {
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
    [SET_MEMBER]: (state, { payload: member }) => ({
      ...state,
      member,
    }),
    [LOGOUT]: () => initialState,
    [INITIALIZE_ITEM]: (state, { payload: key }) => ({
      ...state,
      [key]: initialState[key],
    }),
    [CHECK_SUCCESS]: (state, { payload: member }) => ({
      ...state,
      member,
    }),
    [GET_LIKES_SUCCESS]: (state, { payload: likes }) => ({
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
  },
  initialState,
);
