import { Centered } from '@/components/centered';
import LoadingSpinner from '@/components/loading-spinner';
import RandomSongs from '@/components/random-songs';
import SearchNavbar from '@/components/search-navbar';
import SearchResult from '@/components/search-result';
import { Suspense } from 'react';

function SearchPage() {
  return (
    <div className="relative lg:py-0 py-5 w-full h-full">
      <Suspense
        fallback={
          <Centered>
            <LoadingSpinner />
          </Centered>
        }
      >
        <SearchNavbar />
        <div className="">
          <SearchResult />
        </div>
        <div className="py-10">
          <RandomSongs />
        </div>
      </Suspense>
    </div>
  );
}

export default SearchPage;
