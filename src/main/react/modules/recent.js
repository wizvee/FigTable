import { createAction, handleActions } from 'redux-actions';
import { put, takeLatest } from 'redux-saga/effects';
import produce from 'immer';

const INSERT_RECENT = 'recent/INSERT';
const REMOVE_RECENT = 'recent/REMOVE';

export const insertRecent = createAction(INSERT_RECENT, view => view);
export const removeRecent = createAction(REMOVE_RECENT);

function* insertRecentSaga(action) {
  yield console.log(action.payload.id);
  yield put({ type: INSERT_RECENT, payload: action.payload });
}

export function* recentSaga() {
  yield takeLatest(INSERT_RECENT, insertRecentSaga);
}

const initialState = [];

const recent = handleActions(
  {
    [INSERT_RECENT]: (state, { payload }) => state.concat(payload),
    [REMOVE_RECENT]: (state, action) => initialState,
  },
  initialState,
);

export default recent;
