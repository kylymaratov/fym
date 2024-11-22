'use server';

import { base_url } from '@/api/base-url';
import { SongShowCaseTypes } from '@/types/song-types';
import SongShowCase from './song-show-case';
import makeSSRRequest from '@/api/ssr-api';

async function UserLikedSongs() {
  try {
    const userLikedSongs = await makeSSRRequest<SongShowCaseTypes>(
      base_url + '/user/song/liked',
    );

    if (!userLikedSongs.songs.length) return;

    return (
      <div>
        <SongShowCase data={userLikedSongs} />
      </div>
    );
  } catch (error) {
    return null;
  }
}

export default UserLikedSongs;
