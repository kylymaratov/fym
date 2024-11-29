import LoadingSpinner from '@/components/LoadingSpinner';
import ShowTable from '@/components/ViewTable';
import { useGetUserLikedSongsQuery } from '@/api/song.api';

export const LikedPage = () => {
  const userLikedSongs = useGetUserLikedSongsQuery('?limit=30');

  return (
    <div>
      {userLikedSongs.isLoading ? (
        <LoadingSpinner />
      ) : (
        userLikedSongs.data && <ShowTable data={userLikedSongs.data} />
      )}
    </div>
  );
};
