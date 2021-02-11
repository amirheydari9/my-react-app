import axios from 'axios';

const request = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

request.interceptors.request.use(
  config => config,
  error => Promise.reject(error),
);

export default request;
