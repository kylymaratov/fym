'use server';

import { base_url } from '@/api/base-url';
import { SongShowCaseTypes } from '@/types/song-types';
import SongShowCase from './song-show-case';
import makeSSRRequest from '@/api/ssr-api';
import SongShowCard from './song-show-card';

interface Props {
  variant: 'card' | 'case';
  limit?: number;
}

async function UserLikedSongs({ variant, limit = 12 }: Props) {
  try {
    const userLikedSongs = await makeSSRRequest<SongShowCaseTypes>(
      base_url + `/user/song/liked?limit=${limit}`,
    );

    if (!userLikedSongs.songs.length) return;

    return (
      <div>
        {variant === 'case' ? (
          <SongShowCase data={userLikedSongs} />
        ) : (
          <SongShowCard data={userLikedSongs} />
        )}
      </div>
    );
  } catch (error) {
    return null;
  }
}

export default UserLikedSongs;
