'use client';

import SearchIcon from '@/assets/icons/search.svg';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context/app-context';
import { UseRequest } from '@/hooks/use-request';
import { base_url } from '@/api/base-url';
import CloseIcon from '@/assets/icons/close.svg';
import LoadingSpinner from './loading-spinner';

function SearchField() {
  const pathname = usePathname();

  const { setAppState } = useContext(AppContext);
  const [searchText, setSearchText] = useState<string>('');
  const { request } = UseRequest();
  const [loading, setLoading] = useState<boolean>(false);

  const doSearch = async () => {
    if (!searchText.length) {
      return setAppState('search_result', []);
    }
    try {
      setLoading(true);
      const response = await request(
        base_url + '/song/search',
        'POST',
        JSON.stringify({ query: searchText }),
      );

      setAppState('search_result', response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setAppState('search_result', []);
    setSearchText('');
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      doSearch();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [searchText]);

  const isSearchPage = pathname === '/app/search';

  return (
    <div className="flex gap-4 h-full px-4 items-center justify-start border-gray-700 bg-secondary">
      <Image src={SearchIcon} alt="search" />
      <input
        type="text"
        placeholder="Search by name, keyword, or artist"
        className="w-full outline-none border-none bg-transparent text-sm"
        autoFocus={isSearchPage}
        onChange={(event) => setSearchText(event.target.value)}
        value={searchText}
      />
      {loading && <LoadingSpinner />}
      {isSearchPage && searchText && (
        <button type="button" onClick={resetSearch}>
          <Image src={CloseIcon} alt="close" />
        </button>
      )}
    </div>
  );
}

export default SearchField;
