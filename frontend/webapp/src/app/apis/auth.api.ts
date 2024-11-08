import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TLoginApiRequest, TLoginApiResponse } from '../types/auth.api.types';
import { TSignupResponse, TSignupReuqest } from '../types/auth.api.types';
import baseUrl from '../base';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
    credentials: 'include',
  }),

  endpoints: (builder) => ({
    login: builder.mutation<TLoginApiResponse, TLoginApiRequest>({
      query: (body: TLoginApiRequest) => ({
        url: '/auth/login',
        method: 'POST',
        body: JSON.stringify(body),
      }),
    }),
    signup: builder.mutation<TSignupResponse, TSignupReuqest>({
      query: (body: TSignupReuqest) => ({
        url: '/auth/signup',
        method: 'POST',
        body: JSON.stringify(body),
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
