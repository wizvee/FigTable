import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as restAPI from '../lib/api/restaurant';
import { put, takeLatest, select } from 'redux-saga/effects';

const INSERT_RECENT = 'recent/INSERT';
const REMOVE_RECENT = 'recent/REMOVE';
const CONSTRAINT = 'recent/CONSTRAINT';
const INSERT_RECENT_ASYNC = 'recent/INSERT_ASYNC';
const REMOVE_RECENT_ASYNC = 'recent/REMOVE_ASYNC';

const [GET_RES, GET_RES_SUCCESS, GET_RES_FAILURE] = createRequestActionTypes(
  'recent/GET_RES',
);

export const insertRecent = createAction(INSERT_RECENT, view => view);
export const removeRecent = createAction(REMOVE_RECENT);
export const constraint = createAction(CONSTRAINT);
// redux-saga용 action
export const insertRecentAsync = createAction(
  INSERT_RECENT_ASYNC,
  view => view,
);
export const removeRecentAsync = createAction(
  REMOVE_RECENT_ASYNC,
  () => undefined,
);

export const getRes = createAction(GET_RES, resList => resList);

function* insertRecentSaga({ payload }) {
  // 현재 최근 본 맛집에 등록된 맛집들의 id값
  const before = yield select(({ guest }) =>
    guest.recent.map(view => view.resNo),
  );
  //  등록되어 있지 않은 맛집만 등록
  if (!before.includes(payload.resNo)) {
    if (before.length > 9) yield put({ type: CONSTRAINT });
    yield put({ type: INSERT_RECENT, payload });
  }
  // 등록 후 가장 최근의 맛집 리스트
  const last = yield select(({ guest }) => guest.recent);
  // localStorage에 등록
  yield localStorage.setItem('recent', JSON.stringify(last));
}

function* removeRecentSaga() {
  yield put({ type: REMOVE_RECENT });
  // 삭제 후 가장 최근의 맛집 리스트
  const last = yield select(({ guest }) => guest.recent);
  // localStorage에 등록
  yield localStorage.setItem('recent', JSON.stringify(last));
}

const getResSaga = createRequestSaga(GET_RES, restAPI.getByList);

export function* guestSaga() {
  yield takeLatest(INSERT_RECENT_ASYNC, insertRecentSaga);
  yield takeLatest(REMOVE_RECENT_ASYNC, removeRecentSaga);
  yield takeLatest(GET_RES, getResSaga);
}

const initialState = {
  recent: [],
  searchKey: [],
  recentError: null,
};

const guest = handleActions(
  {
    [INSERT_RECENT]: (state, { payload }) => ({
      ...state,
      recent: state.recent.concat(payload),
    }),
    [REMOVE_RECENT]: state => ({ ...state, recent: initialState.recent }),
    [CONSTRAINT]: state => ({
      ...state,
      recent: state.recent.filter((r, i) => i != 0),
    }),
    [GET_RES_SUCCESS]: (state, { payload: recent }) => ({
      ...state,
      recent,
    }),
    [GET_RES_FAILURE]: (state, { payload: error }) => ({
      ...state,
      recentError: error,
    }),
  },
  initialState,
);

export default guest;
