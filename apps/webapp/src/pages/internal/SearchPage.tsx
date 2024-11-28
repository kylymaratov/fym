import SearchField from '@/components/SearchField';
import ViewCase from '@/components/ViewCase';
import SearchResult from '@/features/SearchResult';
import { useGetRandomSongsQuery } from '@/api/song.api';

export const SearchPage = () => {
  const randomSongs = useGetRandomSongsQuery('?limit=15');
  return (
    <div className="relative lg:py-0 py-5 w-full h-full">
      <div className="h-[50px] w-full my-2">
        <SearchField />
      </div>
      <div className="my-5">
        <SearchResult />
      </div>
      <div className="py-3">
        {randomSongs.data && <ViewCase data={randomSongs.data} />}
      </div>
    </div>
  );
};
