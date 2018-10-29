import axios from 'axios';
import { API_END_POINT } from './config/config';

const instance = axios.create({ baseURL: API_END_POINT });
instance.interceptors.request.use((request) => {
  request.headers['If-Match'] = localStorage.getItem('etag');
  return request;
});
instance.interceptors.response.use((response) => {
  if (response.data.etag) {
    localStorage.setItem('etag', response.data.etag);
  }
  return response;
});

export default instance;
