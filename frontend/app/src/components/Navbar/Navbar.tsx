import { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { MdMusicNote } from 'react-icons/md';
import { useSearchMutation } from '../../app/apis/song.api';
import { useAppDispatch } from '../../app/hooks';
import { setSearchResult } from '../../app/slices/song.slice';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [doSearch] = useSearchMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const openSearchPageOnFocus = () => {
    navigate('/search');
  };

  const searchHandler = async () => {
    try {
      const response = await doSearch({
        query: searchText,
        limit: 20,
        searchBy: 'all',
      }).unwrap();

      dispatch(setSearchResult(response));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchText.length >= 3) {
      const timeout = setTimeout(() => searchHandler(), 1000);

      return () => clearTimeout(timeout);
    }
  }, [searchText]);

  return (
    <div className="flex justify-between items-center h-16 pl-3 pr-3 shadow-md shadow-secondary pt-2 pb-2">
      <div className="w-1/3 text-[22px] font-bold flex items-center">
        <MdMusicNote size={26} /> <span>Songfiy</span>
      </div>
      <div className="w-1/4">
        <div className="bg-secondary p-2 rounded-lg flex items-center cursor-pointer">
          <CiSearch size={26} />
          <input
            onChange={(event) => setSearchText(event.target.value)}
            onFocus={() => openSearchPageOnFocus()}
            placeholder="Search song by title, author, keywoards"
            className="ml-3 text-md bg-transparent text-white placeholder:text-white w-full outline-none border-none cursor-pointer"
          />
        </div>
      </div>
      <div className="w-1/3 flex justify-end items-center">
        <button type="button" className="mr-5 font-bold">
          Signup
        </button>
        <button
          type="button"
          className="font-bold text-black p-1.5 rounded-lg px-5 bg-white hover:scale-105 duration-100"
        >
          Login
        </button>
      </div>
    </div>
  );
};
