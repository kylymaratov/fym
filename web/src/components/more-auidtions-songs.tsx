'use server';

import { base_url } from '@/api/base-url';
import { SongShowCaseTypes } from '@/types/song-types';
import SongShowCard from './song-show-card';
import makeSSRRequest from '@/api/ssr-api';

async function MoreAuditionsSongs() {
  try {
    const topSongsByLikes = await makeSSRRequest<SongShowCaseTypes>(
      base_url + '/song/more-auditions?limit=5',
    );

    return (
      <div>
        <SongShowCard data={topSongsByLikes} withButton />
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

export default MoreAuditionsSongs;
