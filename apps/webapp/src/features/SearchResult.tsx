import SearchBanner from '@/assets/images/search-banner.png';
import ShowTable from '@/components/ShowTable';
import { useAppSelector } from '@/store/hooks';

function SearchResult() {
  const { searchResult } = useAppSelector((state) => state.search);
  return (
    <div>
      {searchResult.length ? (
        <div>
          <ShowTable
            data={{
              title: 'Search result',
              songs: searchResult,
            }}
          />
        </div>
      ) : (
        <div className="flex justify-center my-10">
          <div>
            <img
              src={SearchBanner}
              alt="search"
              loading="lazy"
              className="w-1/2 opacity-60 m-auto select-none pointer-events-none"
            />
            <p className="text-sm text-gray-200 text-center mt-5">
              Start typing the title to search for a song. Everything will be
              found :)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchResult;
