import { UseGetData } from '@/api/requests';
import SearchField from '@/components/SearchField';
import ViewCase from '@/components/ShowCase';
import SearchResult from '@/features/SearchResult';
import { ShowSongResponse } from '@/types/song.types';

export const SearchPage = () => {
  const randomSongs = UseGetData<ShowSongResponse>(
    'randomSongs',
    `/song/random?limit=15`,
  );
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
