import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as restAPI from '../lib/api/eatdeal';
import { takeLatest } from 'redux-saga/effects';

const[GET_POINT, GET_POINT_SUCCESS] = createRequestActionTypes('point/GET_POINT');

export const getPoint = createAction(GET_POINT, memNo => memNo);

const getPointSaga = createRequestSaga(GET_POINT, restAPI.getMemberPoint);

export function* pointSaga(){
  yield takeLatest(GET_POINT, getPointSaga);

}

const initialState={
  point:null,
}

export default handleActions(
  {
    [GET_POINT_SUCCESS]:(state, { payload : point }) =>({
      ...state,
      point
    }),
  },
  initialState,
);
