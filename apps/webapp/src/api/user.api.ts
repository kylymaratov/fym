import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from './base.url';
import { UserTypes } from '@/types/user.types';
import { LoginInitialValues } from '@/pages/LoginPage';
import { SignupInitialValues } from '@/pages/SignupPage';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl, credentials: 'include' }),
  endpoints: (builder) => ({
    userLogout: builder.query({
      query: () => '/auth/logout',
    }),
    getUser: builder.query<UserTypes, string>({
      query: (query: string) => '/user/me' + query,
    }),
    userLogin: builder.mutation<UserTypes, LoginInitialValues>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    userSignup: builder.mutation<{ message: string }, SignupInitialValues>({
      query: (body) => ({
        url: '/auth/signup',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserSignupMutation,
  useGetUserQuery,
  useLazyUserLogoutQuery,
} = userApi;
