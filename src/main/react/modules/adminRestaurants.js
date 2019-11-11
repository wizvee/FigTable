import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as restAPI from '../lib/api/adminRestaurants';
import { takeLatest } from 'redux-saga/effects';

const [
  LIST_RESTAURANTS,
  LIST_RESTAURANTS_SUCCESS,
  LIST_RESTAURANTS_FAILURE,
] = createRequestActionTypes('adminRestaurants/LIST_RESTAURANTS');

export const listRestaurants = createAction(LIST_RESTAURANTS);

const listRestaurantsSaga = createRequestSaga(
  LIST_RESTAURANTS,
  restAPI.getByApply,
);
export function* adminRestuarantsSaga() {
  yield takeLatest(LIST_RESTAURANTS, listRestaurantsSaga);
}

const initialState = {
  restaurants: null,
  error: null,
};

const adminRestaurants = handleActions(
  {
    [LIST_RESTAURANTS_SUCCESS]: (state, { payload: restaurants }) => ({
      ...state,
      restaurants,
    }),
    [LIST_RESTAURANTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default adminRestaurants;
