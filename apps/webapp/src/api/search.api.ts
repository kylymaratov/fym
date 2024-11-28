import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from './base.url';
import { SongTypes } from '@/types/song.types';

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: fetchBaseQuery({ baseUrl, credentials: 'include' }),
  endpoints: (builder) => ({
    searchSongs: builder.mutation<SongTypes[], { query: string }>({
      query: (body) => ({
        url: '/song/search',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSearchSongsMutation } = searchApi;
