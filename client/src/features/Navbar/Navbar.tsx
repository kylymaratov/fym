import { UserContext } from '@/app/context/UserContext';
import { useContext, useEffect, useState } from 'react';
import { IoLogIn } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const { state } = useContext(UserContext);
  const navigate = useNavigate();
  const [fixed, setFixed] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      setFixed(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="w-full h-[60px] p-2 border-b-2 border-secondary flex items-center justify-between">
      <div className="relative w-1/3 h-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full h-full ps-10 outline-none text-sm text-gray-900 border border-gray-300 rounded-lg dark:bg-secondary  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Search songs by name, artist, keywords..."
          required
        />
      </div>
      <div className="flex items-center justify-end">
        {state.user ? (
          <div>{state.user.id}</div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            type="button"
            className="dark:text-gray-200 text-sm flex items-center font-bold rounded-md px-5 py-2.5"
          >
            <span className="mt-1"> Login</span>{' '}
            <IoLogIn className="ml-1" size={22} />
          </button>
        )}
      </div>
    </div>
  );
};
