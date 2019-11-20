import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as adminAPI from '../lib/api/adminInsertRes';
import { takeLatest } from 'redux-saga/effects';

const CHANGE_FIELD = 'adminLogin/CHANGE_FIELD';
const INITIALIZE_FORM = 'adminLogin/INITIALIZE_FORM';

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'adminLogin/LOGIN',
);

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value,
  }),
);

export const initializeForm = createAction(INITIALIZE_FORM, form => form);

export const login = createAction(LOGIN, ({ adminEmail, adminPassword }) => ({
  adminEmail,
  adminPassword,
}));

const loginSaga = createRequestSaga(LOGIN, adminAPI.login);

export function* adminLoginSaga() {
  yield takeLatest(LOGIN, loginSaga);
}

const initialState = {
  login: { adminEmail: '', adminPassword: '' },
  admin: null,
  adminError: null,
};

const adminLogin = handleActions(
  {
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      admin: null,
      adminError: null,
    }),
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value;
      }),

    [LOGIN_SUCCESS]: (state, { payload: admin }) => ({
      ...state,
      adminError: null,
      admin,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      adminError: error,
    }),
  },
  initialState,
);

export default adminLogin;
