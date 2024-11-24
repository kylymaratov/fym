'use server';

import { base_url } from '@/api/base-url';
import { SongShowCaseTypes } from '@/types/song-types';
import SongShowCard from './song-show-card';
import makeSSRRequest from '@/api/ssr-api';
import SongShowCase from './song-show-case';

interface Props {
  variant: 'card' | 'case';
  limit?: number;
}

async function TopSongsByLikes({ variant, limit = 5 }: Props) {
  try {
    const topSongsByLikes = await makeSSRRequest<SongShowCaseTypes>(
      base_url + `/song/top-by-likes?limit=${limit}`,
    );

    return (
      <div>
        {variant === 'case' ? (
          <SongShowCase data={topSongsByLikes} withButton />
        ) : (
          <SongShowCard data={topSongsByLikes} withButton numeric />
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

export default TopSongsByLikes;
