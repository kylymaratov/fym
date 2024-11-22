'use server';

import { base_url } from '@/api/base-url';
import makeSSRRequest from '@/api/ssr-api';
import { SongShowCaseTypes } from '@/types/song-types';
import SongShowCase from './song-show-case';

async function RandomSongs() {
  try {
    const randomSongs = await makeSSRRequest<SongShowCaseTypes>(
      base_url + '/song/random?limit=20',
    );

    return (
      <div>
        <SongShowCase data={randomSongs} withButton />
      </div>
    );
  } catch (error) {
    return (
      <div>
        <p>{(error as Error).message}</p>
      </div>
    );
  }
}

export default RandomSongs;
