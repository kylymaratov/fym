import LoadingSpinner from '@/components/LoadingSpinner';
import ShowTable from '@/components/ShowTable';
import { useGetUserLikedSongsQuery } from '@/api/song.api';

export const LikedPage = () => {
  const userLikedSongs = useGetUserLikedSongsQuery('?limit=30');

  return (
    <div>
      {userLikedSongs.isLoading ? (
        <LoadingSpinner />
      ) : (
        userLikedSongs.data && <ShowTable data={userLikedSongs.data} numeric />
      )}
    </div>
  );
};
