import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from '../base';
import {
  TGetTokenResponse,
  TSearchRequest,
  TSearchResponse,
} from '../types/song.api.types';

export const songApi = createApi({
  reducerPath: 'songApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
    credentials: 'include',
  }),

  endpoints: (builder) => ({
    search: builder.mutation<TSearchResponse[], TSearchRequest>({
      query: (body: TSearchRequest) => ({
        url: '/song/search',
        method: 'POST',
        body: JSON.stringify(body),
      }),
    }),
    getToken: builder.query<TGetTokenResponse, string>({
      query: (query) => '/song/listen/token' + query,
    }),
  }),
});

export const { useSearchMutation, useGetTokenQuery } = songApi;
