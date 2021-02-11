/*
 *
 * UserPage reducer
 *
 */
import produce from 'immer';
import { FETCH_USERS_SUCCESS_ACTION } from './constants';

export const initialState = {
  users: [],
};

/* eslint-disable default-case, no-param-reassign */
const userPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_USERS_SUCCESS_ACTION:
        draft.users = action.users;
        break;
    }
  });

export default userPageReducer;
