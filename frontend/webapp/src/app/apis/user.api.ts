import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from '../base';
import { TGetUserResponse } from '../types/user.api.types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
    credentials: 'include',
  }),

  endpoints: (builder) => ({
    getUser: builder.query<TGetUserResponse, string>({
      query: (query: string) => ({
        url: '/user' + query,
      }),
    }),
  }),
});

export const { useGetUserQuery } = userApi;
