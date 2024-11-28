'use client';

import SearchIcon from '@/assets/icons/search.svg';
import { useContext, useEffect, useState } from 'react';
import CloseIcon from '@/assets/icons/close.svg';
import { useLocation } from 'react-router-dom';
import LoadingText from './LoadingText';
import { SongTypes } from '@/types/song.types';
import { UseApi } from '@/api/api';
import { SearchContext } from '@/context/SearchContext';

function SearchField() {
  const location = useLocation();
  const { request } = UseApi();

  const { setSearchState, state } = useContext(SearchContext);
  const [loading, setLoading] = useState<boolean>(false);

  const doSearch = async () => {
    if (!state.searchQuery.length) {
      return setSearchState('searchResult', []);
    }
    try {
      setLoading(true);
      const response = await request<SongTypes>(
        '/song/search',
        'POST',
        JSON.stringify({ query: state.searchQuery }),
      );
      setSearchState('searchResult', response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setSearchState('searchResult', []);
    setSearchState('searchQuery', '');
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      doSearch();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [state.searchQuery]);

  const isSearchPage = location.pathname === '/search';

  return (
    <div className="flex gap-4 h-full px-4 items-center justify-start rounded-xl border-gray-700 bg-black">
      <img src={SearchIcon} alt="search" />
      <input
        type="text"
        placeholder="Search by name, keyword, or artist"
        className="w-full outline-none border-none bg-transparent text-sm"
        autoFocus={isSearchPage}
        onChange={(event) => setSearchState('searchQuery', event.target.value)}
        value={state.searchQuery}
      />
      {loading && <LoadingText />}
      {isSearchPage && state.searchQuery && (
        <button type="button" onClick={resetSearch}>
          <img src={CloseIcon} alt="close" />
        </button>
      )}
    </div>
  );
}

export default SearchField;
