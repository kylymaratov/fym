'use client';

import Image from 'next/image';
import SearchBanner from '@/assets/images/search-banner.png';
import { useContext } from 'react';
import { AppContext } from '@/context/app-context';
import SongShowCard from './song-show-card';

function SearchResult() {
  const { state } = useContext(AppContext);
  return (
    <div>
      {state.search_result.length ? (
        <div>
          <SongShowCard
            data={{ title: 'Search result', songs: state.search_result }}
          />
        </div>
      ) : (
        <div className="flex justify-center my-10">
          <div>
            <Image
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
