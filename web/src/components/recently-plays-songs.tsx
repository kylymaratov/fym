'use server';

import { base_url } from '@/api/base-url';
import { SongShowCaseTypes } from '@/types/song-types';
import SongShowCase from './song-show-case';
import makeSSRRequest from '@/api/ssr-api';
async function RecentlyPlaySongs() {
  try {
    const recentlyPlaysSongs = await makeSSRRequest<SongShowCaseTypes>(
      base_url + '/song/recently?limit=30',
    );

    if (!recentlyPlaysSongs.songs.length) return;

    return (
      <div>
        <SongShowCase data={recentlyPlaysSongs} />
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

export default RecentlyPlaySongs;
