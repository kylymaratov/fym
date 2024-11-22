import axios from 'axios';
import { base_url } from './base-url';

const api = axios.create({ baseURL: base_url, withCredentials: true });

api.interceptors.request.use(
  (request) => {
    request.headers.set('Content-Type', 'application/json');

    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
