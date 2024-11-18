import { UserContext } from '@/app/context/UserContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const { state } = useContext(UserContext);

  return (
    <div className="w-full p-2 border-b-2 border-secondary flex items-center justify-between">
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
          className="block w-full h-[40px] ps-10 outline-none text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Mockups, Logos..."
          required
        />
      </div>
      <div>
        {state.user ? (
          <div>{state.user.id}</div>
        ) : (
          <div>
            <Link to="/login" className="text-bold text-md">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
