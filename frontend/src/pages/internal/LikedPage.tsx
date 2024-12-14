import ViewTable from '@/components/ViewTable';
import { useGetUserLikedSongsQuery } from '@/api/song.api';

export const LikedPage = () => {
  const userLikedSongs = useGetUserLikedSongsQuery('?limit=100');

  return (
    <div className="w-full h-full relative">
      {userLikedSongs.data && <ViewTable data={userLikedSongs.data} />}
    </div>
  );
};
