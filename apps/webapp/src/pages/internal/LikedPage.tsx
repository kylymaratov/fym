import { UseGetData } from '@/api/requests';
import LoadingSpinner from '@/components/LoadingSpinner';
import ShowTable from '@/components/ShowTable';
import { ShowSongResponse } from '@/types/song.types';

export const LikedPage = () => {
  const userLikedSongs = UseGetData<ShowSongResponse>(
    'userLikedSongs',
    `/user/song/liked?limit=100`,
  );

  return (
    <div>
      {userLikedSongs.loading ? (
        <LoadingSpinner />
      ) : (
        userLikedSongs.data && <ShowTable data={userLikedSongs.data} numeric />
      )}
    </div>
  );
};
