import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const INSERT_RECENT = 'recent/INSERT';
const REMOVE_RECENT = 'recent/REMOVE';

export const insertRecent = createAction(INSERT_RECENT, view => view);
export const removeRecent = createAction(REMOVE_RECENT);

const initialState = {
  recent: [],
};

const recent = handleActions(
  {
    [INSERT_RECENT]: (state, { payload }) => ({
      ...state,
      recent: state.recent.concat(payload),
    }),
    [REMOVE_RECENT]: (state, action) => initialState,
  },
  initialState,
);

export default recent;
