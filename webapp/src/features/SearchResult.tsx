import SearchBanner from '@/assets/images/search-banner.png';
import { useContext } from 'react';
import ShowTable from '@/components/ShowTable';
import { SearchContext } from '@/context/SearchContext';

function SearchResult() {
  const { state } = useContext(SearchContext);
  return (
    <div>
      {state.searchResult.length ? (
        <div>
          <ShowTable
            data={{
              title: 'Search result',
              songs: state.searchResult,
              url: '',
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
