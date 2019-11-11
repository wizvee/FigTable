import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as restAPI from '../lib/api/eatdeal';
import { takeLatest } from 'redux-saga/effects';

const [READ_EAT, READ_EAT_SUCCESS, READ_EAT_FAILURE] = createRequestActionTypes(
  'eatdeal/READ_EAT',
);
const UNLOAD_EAT = 'eatdeal/UNLOAD_EAT'; // 상세 페이지에서 벗어날 때 데이터 비우기

export const readEat = createAction(READ_EAT, eatNo=>eatNo);
export const unloadEat = createAction(UNLOAD_EAT);

const readEatSaga = createRequestSaga(READ_EAT, restAPI.getByEatNo);
export function* eatdealSaga() {
  yield takeLatest(READ_EAT, readEatSaga);
}
const initialState = {
  eatdeal: null,
  error: null,
};
const eatdeal = handleActions(
  {
    [READ_EAT_SUCCESS]: (state, { payload: eatdeal }) => ({
      ...state,
      eatdeal,
    }),
    [READ_EAT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_EAT]: () => initialState,
  },
  initialState,
);

export default eatdeal;
