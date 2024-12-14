import { useGetRecentlySongsQuery } from '@/api/song.api';
import ViewTable from '@/components/ViewTable';

export const RecentPage = () => {
  const recentlySongs = useGetRecentlySongsQuery('?limit=40');

  return (
    <div className="w-full h-full relative">
      {recentlySongs.data && <ViewTable data={recentlySongs.data} />}
    </div>
  );
};
