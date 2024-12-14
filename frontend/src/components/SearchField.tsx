import SearchIcon from '@/assets/icons/search.svg';
import { useEffect, useMemo } from 'react';
import CloseIcon from '@/assets/icons/close.svg';
import { useLocation } from 'react-router-dom';
import LoadingText from './LoadingText';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { searchActions } from '@/store/slices/search.slice';
import { useSearchSongsMutation } from '@/api/search.api';
import { toast } from 'react-toastify';

function SearchField() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.search);
  const [searchSongs, { isLoading }] = useSearchSongsMutation();

  const doSearch = async () => {
    if (!searchQuery.length) {
      return dispatch(searchActions.setSearchResult([]));
    }
    try {
      const response = await searchSongs({ query: searchQuery }).unwrap();
      dispatch(searchActions.setSearchResult(response));
    } catch (error) {
      toast((error as Error).message);
    }
  };

  const resetSearch = () => {
    dispatch(searchActions.setSearchResult([]));
    dispatch(searchActions.setSearchQuery(''));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      doSearch();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const isSearchPage = useMemo(
    () => location.pathname === '/search',
    [location.pathname],
  );

  return (
    <div className="flex gap-4 h-full px-4 items-center justify-start rounded-xl border-gray-700 bg-[#1f1f1f]">
      <img src={SearchIcon} alt="search" />
      <input
        type="text"
        placeholder="Search by name, keyword, or artist"
        className="w-full outline-none border-none bg-transparent text-sm"
        autoFocus={isSearchPage}
        onChange={(event) =>
          dispatch(searchActions.setSearchQuery(event.target.value))
        }
        value={searchQuery}
      />
      {isLoading && <LoadingText />}
      {isSearchPage && searchQuery && (
        <button type="button" onClick={resetSearch}>
          <img src={CloseIcon} alt="close" />
        </button>
      )}
    </div>
  );
}

export default SearchField;
