import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as restAPI from '../lib/api/ownerEnroll';
import { takeLatest } from 'redux-saga/effects';

const CHANGE_FIELD = 'ownerEnroll/CHANGE_FIELD';
const CHANGE_FILE = 'ownerEnroll/CHANGE_FILE';
const CHANGE_AUTH_FILE = 'ownerEnroll/CHANGE_AUTH_FILE';
const TOGGLE_FIELD = 'ownerEnroll/TOGGLE_FIELD';
const INITIALIZE_FORM = 'ownerEnroll/INITIALIZE_FORM';
const SEL_ADDR = 'ownerEnroll/SEL_ADDR';
const SET_OWNER = 'owner/SET_OWNER';

const [SEARCH_RES, SEARCH_RES_SUCCESS] = createRequestActionTypes(
  'ownerEnroll/SEARCH_RES',
);
const [SELECT_RES, SELECT_RES_SUCCESS] = createRequestActionTypes(
  'ownerEnroll/SELECT_RES',
);

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  'ownerEnroll/REGISTER',
);
const [ADD_SHOP, ADD_SHOP_SUCCESS] = createRequestActionTypes(
  'ownerEnroll/ADD_SHOP',
);
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'ownerEnroll/LOGIN',
);

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const changeFile = createAction(CHANGE_FILE, data => data);
export const changeAuthFile = createAction(CHANGE_AUTH_FILE, data => data);

export const toggleField = createAction(TOGGLE_FIELD, ({ key }) => ({ key }));

export const initializeForm = createAction(INITIALIZE_FORM, type => type);

export const searchRes = createAction(SEARCH_RES, keyword => keyword);
export const selectRes = createAction(SELECT_RES, resNo => resNo);
export const selAddr = createAction(
  SEL_ADDR,
  ({ resAddress, resLat, resLong }) => ({
    resAddress,
    resLat,
    resLong,
  }),
);
export const login = createAction(LOGIN, ({ ownEmail, ownPassword }) => ({
  ownEmail,
  ownPassword,
}));
export const register = createAction(
  REGISTER,
  ({
    ownEmail,
    ownName,
    ownPassword,
    ownPasswordCk,
    ownPhone,
    ownStatics,
    resNo,
    resName,
    resAddress,
    resTel,
    resLat,
    resLong,
    resLocationKeyword,
    resFoodKeyword,
    resThumb,
    authFile,
  }) => ({
    ownEmail,
    ownName,
    ownPassword,
    ownPasswordCk,
    ownPhone,
    ownStatics,
    resNo,
    resName,
    resAddress,
    resTel,
    resLat,
    resLong,
    resLocationKeyword,
    resFoodKeyword,
    resThumb,
    authFile,
  }),
);

export const addShop = createAction(
  ADD_SHOP,
  ({
    ownNo,
    resNo,
    resName,
    resAddress,
    resTel,
    resLat,
    resLong,
    resLocationKeyword,
    resFoodKeyword,
    resThumb,
    authFile,
  }) => ({
    ownNo,
    resNo,
    resName,
    resAddress,
    resTel,
    resLat,
    resLong,
    resLocationKeyword,
    resFoodKeyword,
    resThumb,
    authFile,
  }),
);
export const setOwner = createAction(SET_OWNER, owner => owner);

const searchSaga = createRequestSaga(SEARCH_RES, restAPI.searchRes);
const selectSaga = createRequestSaga(SELECT_RES, restAPI.selectRes);
const registerSaga = createRequestSaga(REGISTER, restAPI.enrollOwn);
const loginSaga = createRequestSaga(LOGIN, restAPI.login);
const addSaga = createRequestSaga(ADD_SHOP, restAPI.addShop);

export function* ownerEnrollSaga() {
  yield takeLatest(SEARCH_RES, searchSaga);
  yield takeLatest(SELECT_RES, selectSaga);
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(ADD_SHOP, addSaga);
}

const initialState = {
  restaurant: {
    resNo: '',
    resName: '',
    resTel: '',
    resAddress: '',
    resLocationKeyword: '',
    resFoodKeyword: '',
    resThumb: '',
    resLat: '',
    resLong: '',
  },
  owner: {
    ownEmail: '',
    ownPassword: '',
    ownPasswordCk: '',
    ownPhone: '',
    ownName: '',
    ownStatics: false,
  },
  resList: [],
  restaurants: [],
  authFile: '',
  enrollSuccess: false,
  addSuccess: false,
  loginE: null,
  loginS: null,
};

const enrollOwner = handleActions(
  {
    [SEARCH_RES_SUCCESS]: (state, { payload: restaurants }) => ({
      ...state,
      restaurants,
    }),
    [SELECT_RES_SUCCESS]: (state, { payload: restaurant }) => ({
      ...state,
      restaurant,
    }),
    [INITIALIZE_FORM]: (state, { payload: type }) => ({
      ...state,
      [type]: initialState[type],
    }),
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, draft => {
        if (key.substring(0, 3) == 'own') {
          draft['owner'][key] = value;
        } else {
          draft['restaurant'][key] = value;
        }
      }),
    [CHANGE_FILE]: (state, { payload: data }) =>
      produce(state, draft => {
        draft.restaurant.resThumb = data;
      }),
    [CHANGE_AUTH_FILE]: (state, { payload: data }) =>
      produce(state, draft => {
        draft.authFile = data;
      }),
    [SEL_ADDR]: (state, { payload: { resAddress, resLat, resLong } }) =>
      produce(state, draft => {
        draft.restaurant.resAddress = resAddress;
        draft.restaurant.resLat = resLat;
        draft.restaurant.resLong = resLong;
      }),
    [REGISTER_SUCCESS]: (state, { payload: enrollSuccess }) => ({
      ...state,
      enrollSuccess,
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
    }),
    [LOGIN_SUCCESS]: (state, { payload: data }) =>
      produce(state, draft => {
        draft.owner = data.owner;
        draft.resList = data.resList;
        draft.loginS = true;
      }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loginE: error,
    }),
    [SET_OWNER]: (state, { payload: owner }) => ({
      ...state,
      owner,
    }),
    [ADD_SHOP_SUCCESS]: (state, { payload: data }) =>
      produce(state, draft => {
        draft.resList = data;
        draft.addSuccess = true;
      }),
  },
  initialState,
);

export default enrollOwner;
