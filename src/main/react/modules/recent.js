import { createAction, handleActions } from 'redux-actions';
import { put, takeLatest, select } from 'redux-saga/effects';
import produce from 'immer';

const INSERT_RECENT = 'recent/INSERT';
const REMOVE_RECENT = 'recent/REMOVE';
const INSERT_RECENT_ASYNC = 'recent/INSERT_ASYNC';
const REMOVE_RECENT_ASYNC = 'recent/REMOVE_ASYNC';

export const insertRecent = createAction(INSERT_RECENT, view => view);
export const removeRecent = createAction(REMOVE_RECENT);
// redux-saga용 action
export const insertRecentAsync = createAction(
  INSERT_RECENT_ASYNC,
  view => view,
);
export const removeRecentAsync = createAction(
  REMOVE_RECENT_ASYNC,
  () => undefined,
);

function* insertRecentSaga({ payload }) {
  // 현재 최근 본 맛집에 등록된 맛집들의 id값
  const before = yield select(state => state.recent.map(view => view.id));
  //  등록되어 있지 않은 맛집만 등록
  if (!before.includes(payload.id)) yield put({ type: INSERT_RECENT, payload });
  // 등록 후 가장 최근의 맛집 리스트
  const last = yield select(state => state.recent);
  // localStorage에 등록
  yield localStorage.setItem('recent', JSON.stringify(last));
}

function* removeRecentSaga() {
  yield put({ type: REMOVE_RECENT });
  // 삭제 후 가장 최근의 맛집 리스트
  const last = yield select(state => state.recent);
  // localStorage에 등록
  yield localStorage.setItem('recent', JSON.stringify(last));
}

export function* recentSaga() {
  yield takeLatest(INSERT_RECENT_ASYNC, insertRecentSaga);
  yield takeLatest(REMOVE_RECENT_ASYNC, removeRecentSaga);
}

const initialState = [];

const recent = handleActions(
  {
    [INSERT_RECENT]: (state, { payload }) => state.concat(payload),
    [REMOVE_RECENT]: () => initialState,
  },
  initialState,
);

export default recent;
