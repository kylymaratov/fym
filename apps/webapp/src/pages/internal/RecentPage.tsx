import { UseGetData } from '@/api/requests';
import LoadingSpinner from '@/components/LoadingSpinner';
import ShowTable from '@/components/ShowTable';
import { PlayerContext } from '@/context/PlayerContext';
import { ShowSongResponse } from '@/types/song.types';
import { useContext } from 'react';

export const RecentPage = () => {
  const playerState = useContext(PlayerContext);

  const recentlyPlaysSongs = UseGetData<ShowSongResponse>(
    'recentlyPlaysSongs',
    `/song/recently?limit=40&playNow=${playerState.state.playNow?.song_id}`,
  );

  return (
    <div>
      {recentlyPlaysSongs.loading ? (
        <LoadingSpinner />
      ) : (
        recentlyPlaysSongs.data && (
          <ShowTable data={recentlyPlaysSongs.data} numeric />
        )
      )}
    </div>
  );
};
