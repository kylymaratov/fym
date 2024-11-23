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

async function RecentlyPlaySongs({ variant, limit = 30 }: Props) {
  try {
    const recentlyPlaysSongs = await makeSSRRequest<SongShowCaseTypes>(
      base_url + `/song/recently?limit=${limit}`,
    );

    if (!recentlyPlaysSongs.songs.length) return;

    return (
      <div>
        {variant === 'case' ? (
          <SongShowCase data={recentlyPlaysSongs} />
        ) : (
          <SongShowCard data={recentlyPlaysSongs} />
        )}
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
