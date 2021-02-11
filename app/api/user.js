import request from '../utils/request';

export function getUsersApi() {
  const config = {
    method: 'GET',
    url: '/users',
  };
  return request(config);
}
