import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_USERS_ACTION } from './constants';
import { fetchUsersFailAction, fetchUsersSuccessAction } from './actions';
import { getUsersApi } from '../../api/user';

function* fetchUsersFromApi() {
  try {
    const users = yield call(getUsersApi);
    yield put(fetchUsersSuccessAction(users.data));
  } catch (error) {
    yield put(fetchUsersFailAction(error.response));
  }
}

export default function* fetchUsers() {
  yield takeLatest(FETCH_USERS_ACTION, fetchUsersFromApi);
}
