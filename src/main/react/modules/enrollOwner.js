import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as restAPI from '../lib/api/ownerEnroll';
import { takeLatest } from 'redux-saga/effects';

const CHANGE_FIELD = 'ownerEnroll/CHANGE_FIELD';
const TOGGLE_FIELD = 'ownerEnroll/TOGGLE_FIELD';
const INITIALIZE_FORM = 'ownerEnroll/INITIALIZE_FORM';

const [SEARCH_RES, SEARCH_RES_SUCCESS] = createRequestActionTypes(
  'ownerEnroll/SEARCH_RES',
);

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAULURE] = createRequestActionTypes(
  'ownerEnroll/REGISTER',
);

export const changeField = createAction(
  CHANGE_FIELD,
  ({ type, key, value }) => ({
    type,
    key,
    value,
  }),
);

export const toggleField = createAction(TOGGLE_FIELD, ({ type, key }) => ({
  type,
  key,
}));

export const initializeForm = createAction(INITIALIZE_FORM, type => type);

export const searchRes = createAction(SEARCH_RES, keyword => keyword);

const searchSaga = createRequestSaga(SEARCH_RES, restAPI.searchRes);

export function* ownerEnrollSaga() {
  yield takeLatest(SEARCH_RES, searchSaga);
}

const initialState = {
  restaurant: {
    resNo: '',
    resName: '',
    resTel: '',
    resLocationKeyword: '',
    resFoodKeyword: '',
    resThumb: '',
  },
  owner: {
    ownEmail: '',
    ownPassword: '',
    passwordCk: '',
    ownPhone: '',
    ownName: '',
    ownStatics: false,
  },
  restaurants: [],
};

const enrollOwner = handleActions(
  {
    [SEARCH_RES_SUCCESS]: (state, { payload: restaurants }) => ({
      ...state,
      restaurants,
    }),
  },
  initialState,
);

export default enrollOwner;
