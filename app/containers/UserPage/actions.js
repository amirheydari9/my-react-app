import {
  FETCH_USERS_ACTION,
  FETCH_USERS_SUCCESS_ACTION,
  FETCH_USERS_FAIL_ACTION,
} from './constants';

export function fetchUsersAction() {
  return {
    type: FETCH_USERS_ACTION,
  };
}

export function fetchUsersSuccessAction(users) {
  return {
    type: FETCH_USERS_SUCCESS_ACTION,
    users,
  };
}

export function fetchUsersFailAction(error) {
  return {
    type: FETCH_USERS_FAIL_ACTION,
    error,
  };
}
