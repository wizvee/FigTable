import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as insertAPI from '../lib/api/adminInsertRes';
import { takeLatest } from 'redux-saga/effects';

//모든 내용 초기화
const INITIALIZE = 'adminInsertRes/INITIALIZE';
const CHANGE_FIELD = 'adminInsertRes/CHANGE_FIELD';

export const intialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));

const [
  INSERT_RES,
  INSERT_RES_SUCCESS,
  INSERT_RES_FAILURE,
] = createRequestActionTypes('adminInsertRes/INSERT_RES'); //restaurant 등록

export const insertRes = createAction(
  INSERT_RES,
  ({
    resName,
    resAddress,
    resTel,
    ownName,
    resLocationKeyword,
    resFoodKeyword,
    resOpenDay,
    resCloseTime,
    resThumb,
  }) => ({
    resName,
    resAddress,
    resTel,
    ownName,
    resLocationKeyword,
    resFoodKeyword,
    resOpenDay,
    resCloseTime,
    resThumb,
  }),
);

//사가 생성
const insertResSaga = createRequestSaga(INSERT_RES, insertAPI.insertRes);
export function* adminInsertResSaga() {
  yield takeLatest(INSERT_RES, insertResSaga);
}

const initialState = {
  resName: '',
  resAddress: '',
  resTel: '',
  ownName: '',
  resLocationKeyword: '',
  resFoodKeyword: '',
  resOpenDay: '',
  resCloseTime: '',
  resThumb: '',
  restaurant: null,
  restaurantError: null,
};

const adminInsertRes = handleActions(
  {
    //initialState를 넣어 초기 상태로 바꾸기
    [INITIALIZE]: state => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, draft => {
        draft[key] = value;
      }),
    [INSERT_RES]: state => ({
      ...state,
      restaurant: null,
      restaurantError: null,
    }),
    //reataurant 등록 성공시
    [INSERT_RES_SUCCESS]: (state, { payload: restaurant }) => ({
      ...state,
      restaurant,
    }),
    [INSERT_RES_FAILURE]: (state, { payload: restaurantError }) => ({
      ...state,
      restaurantError,
    }),
  },
  initialState,
);

export default adminInsertRes;
