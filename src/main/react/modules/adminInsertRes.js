import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as insertAPI from '../lib/api/adminInsertRes';
import { takeLatest } from 'redux-saga/effects';

//모든 내용 초기화
const INITIALIZE_FORM = 'adminInsertRes/INITIALIZE_FORM';
const CHANGE_FIELD = 'adminInsertRes/CHANGE_FIELD';

const [
  INSERT_RES,
  INSERT_RES_SUCCESS,
  INSERT_RES_FAILURE,
] = createRequestActionTypes('adminInsertRes/INSERT_RES'); //restaurant 등록

const APPLY_RES = 'adminInsertRes/APPLY_RES';

const SEL_ADDR = 'adminInsertRes/SEL_ADDR';

export const initializeForm = createAction(INITIALIZE_FORM, form => form);
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value,
  }),
);

export const insertRes = createAction(
  INSERT_RES,
  ({
    resName,
    resAddress,
    resTel,
    resLocationKeyword,
    resFoodKeyword,
    resLat,
    resLong,
    resThumb,
  }) => ({
    resName,
    resAddress,
    resTel,
    resLocationKeyword,
    resFoodKeyword,
    resLat,
    resLong,
    resThumb,
  }),
);

export const selAddr = createAction(
  SEL_ADDR,
  ({ resAddress, resLat, resLong }) => ({
    resAddress,
    resLat,
    resLong,
  }),
);

export const applyRes = createAction(APPLY_RES, resNo => resNo);

//사가 생성
const insertResSaga = createRequestSaga(INSERT_RES, insertAPI.insertRes);

export function* adminInsertResSaga() {
  yield takeLatest(INSERT_RES, insertResSaga);
}

const initialState = {
  insertRes: {
    resName: '',
    resTel: '',
    resAddress: '',
    resLocationKeyword: '',
    resFoodKeyword: '',
    resLat: 0,
    resLong: 0,
    resOpenDay: '',
    resCloseTime: '',
    resThumb: '',
  },
  restaurant: null,
  restaurantError: null,
};

const adminInsertRes = handleActions(
  {
    //initialState를 넣어 초기 상태로 바꾸기
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      // 폼을 초기화 할 때 restaurant도 초기화
      restaurant: null,
      restaurantError: null,
    }),
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft.insertRes[key] = value;
      }),

    //reataurant 등록 성공시
    [INSERT_RES_SUCCESS]: (state, { payload: restaurant }) => ({
      ...state,
      restaurantError: null,
      restaurant: 1,
    }),
    [INSERT_RES_FAILURE]: (state, { payload: error }) => ({
      ...state,
      restaurantError: error,
    }),
    [SEL_ADDR]: (state, { payload: { resAddress, resLat, resLong } }) =>
      produce(state, draft => {
        draft.insertRes.resAddress = resAddress;
        draft.insertRes.resLat = resLat;
        draft.insertRes.resLong = resLong;
      }),

    [APPLY_RES]: (state, { payload: resNo }) =>
      produce(state, draft => {
        const restaurant = draft.adminInsertRes.find(
          restaurant => restaurant.resNo == resNo,
        );
        restaurant.resApply = 'A';
      }),
  },
  initialState,
);

export default adminInsertRes;
