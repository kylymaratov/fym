import axios, { Method } from 'axios';
import { baseUrl } from './base.url';
import { useCallback } from 'react';

const api = axios.create({ baseURL: baseUrl });

api.interceptors.request.use(
  (request) => {
    request.headers.set('Content-Type', 'application/json');

    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const UseApi = () => {
  const request = useCallback(
    async <T>(
      url: string,
      method: Method = 'GET',
      data: any = {},
      headers: any = {},
    ) => {
      return await api<T | any>({
        url,
        method,
        data,
        headers,
        withCredentials: true,
      });
    },
    [],
  );

  return { request };
};
