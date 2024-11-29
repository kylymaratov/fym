import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from './base.url';
import { ViewCaseTypes } from '@/types/song.types';

export const songApi = createApi({
  reducerPath: 'songApi',
  baseQuery: fetchBaseQuery({ baseUrl, credentials: 'include' }),
  endpoints: (builder) => ({
    getTopSongsByLikes: builder.query<ViewCaseTypes, string>({
      query: (query: string) => '/song/top-by-likes' + query,
    }),
    getTopSongsByListening: builder.query<ViewCaseTypes, string>({
      query: (query: string) => '/song/more-auditions' + query,
    }),
    getRecentlySongs: builder.query<ViewCaseTypes, string>({
      query: (query: string) => '/song/recently' + query,
    }),
    getRecomendationSongs: builder.query<ViewCaseTypes, string>({
      query: (query: string) => '/song/recommendations' + query,
    }),
    getUserLikedSongs: builder.query<ViewCaseTypes, string>({
      query: (query: string) => '/song/liked' + query,
    }),
    getRandomSongs: builder.query<ViewCaseTypes, string>({
      query: (query: string) => '/song/random' + query,
    }),
    getRelatedSongs: builder.query<ViewCaseTypes, string>({
      query: (query: string) => '/song/related' + query,
    }),
  }),
});

export const {
  useGetTopSongsByListeningQuery,
  useGetTopSongsByLikesQuery,
  useGetRecentlySongsQuery,
  useGetRecomendationSongsQuery,
  useGetUserLikedSongsQuery,
  useGetRandomSongsQuery,
  useLazyGetRandomSongsQuery,
  useGetRelatedSongsQuery,
  useLazyGetRelatedSongsQuery,
} = songApi;
