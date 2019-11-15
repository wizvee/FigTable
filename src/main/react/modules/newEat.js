import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as newEatAPI from '../lib/api/newEat';


const CHANGE_FIELD = 'newEat/CHANGE_FILED';
const INITIALIZE_FORM = 'newEat/INITIALIZE_FORM';
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  'newEat/REGISTER',
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

export const register = createAction(
  REGISTER,
  ({ resNo, resName, resRocationKeyword, thumb, eatFoodName, eatCount, eatOriginPrice, eatDiscount, eatStartDate, eatEndDate, eatContent,  })=>({
   
	resNo,
	resName,
	resRocationKeyword,
  thumb,
	eatFoodName,
	eatCount,
	eatOriginPrice,
	eatDiscount,
	eatStartDate,
	eatEndDate,
	eatContent,
  }),
);

// 사가 생성
const newEatRegiSaga = createRequestSaga(REGISTER, newEatAPI.newEat);
export function* newEatSaga() {
  yield takeLatest(REGISTER, newEatRegiSaga);
}
const initialState = {
  register:{
    resNo:'',
    resName:'',
    resRocationKeyword:'',
    thumb:'',
    eatFoodName:'',
    eatCount:'',
    eatOriginPrice:'',
    eatDiscount:'',
    eatStartDate:'',
    eatEndDate:'',
    eatContent:'',
  },
  newEat:null,
  newEatError:null,

};

const newEat = handleActions(

  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft.register[key] = value;
      // draft.register.thumb=value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      // 폼을 초기화 할 때 auth도 초기화
      newEat: null,
      newEatError: null,
    }),
    [REGISTER_SUCCESS]: (state, { payload: newEat }) => ({
      ...state,
      newEatError:null,
      newEat: 1,
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      newEatError: error,
    }),
  },
  initialState,
);

export default newEat;