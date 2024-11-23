'use server';

import { base_url } from '@/api/base-url';
import { SongShowCaseTypes } from '@/types/song-types';
import makeSSRRequest from '@/api/ssr-api';
import SongShowCase from './song-show-case';
import { AxiosError } from 'axios';

async function RecomendSongs() {
  try {
    const recomendSongs = await makeSSRRequest<SongShowCaseTypes>(
      base_url + '/user/song/recomend',
    );

    if (!recomendSongs.songs.length) return;

    return (
      <div>
        <SongShowCase data={recomendSongs} withButton />
      </div>
    );
  } catch (error) {
    if ((error as AxiosError).status === 401) return;

    return (
      <div>
        <p>{(error as Error).message}</p>
      </div>
    );
  }
}

export default RecomendSongs;
