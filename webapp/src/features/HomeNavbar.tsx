'use client';

import { useContext } from 'react';
import RadioIcon from '@/assets/icons/radio.svg';
import BannerImg from '@/assets/images/banner.png';
import { UserContext } from '@/context/UserContext';
import ProfileBadge from '@/components/ProfileBadge';
import { PlayerContext } from '@/context/PlayerContext';
import SearchField from '@/components/SearchField';
import { Link } from 'react-router-dom';

function HomeNavbar() {
  const { state } = useContext(PlayerContext);
  const userState = useContext(UserContext);

  return (
    <div className="px-2 lg:px-[21px] py-[19px] h-[450px] relative overflow-hidden">
      <div className="absolute w-[35%] bg-[#0f0f0f] h-[120%] z-20 -top-10 left-20 opacity-100 blur-lg"></div>
      {state.playNow ? (
        <img
          src={`https://i.ytimg.com/vi/${state.playNow.song_id}/mqdefault.jpg`}
          loading="lazy"
          alt="bg"
          className="absolute select-none pointer-events-none z-10 top-0 right-0 w-[70%] opacity-30 object-cover h-[110%] rounded-lg"
        />
      ) : (
        <img
          src={BannerImg}
          loading="lazy"
          alt="banner"
          className="absolute select-none pointer-events-none z-10 top-0 right-0 w-[70%] opacity-30 object-cover h-[110%] rounded-lg"
        />
      )}
      <div className="z-30 relative h-full">
        <div className="flex h-[40px] justify-between">
          <div className="w-[80%] lg:w-1/3">
            <Link to="/search" className="cursor-text">
              <SearchField />
            </Link>
          </div>
          <div>
            {userState.state.user ? (
              <div>
                <ProfileBadge
                  user={userState.state.user}
                  setUserState={userState.setUserState}
                />
              </div>
            ) : (
              <Link
                to="/login"
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
              >
                <span className="text-sm text-center relative p-1 lg:p-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Login / Signup
                </span>
              </Link>
            )}
          </div>
        </div>
        <div className="mt-[50px] w-full lg:w-[30%]">
          <h1 className="font-bold text-3xl text-gray-200">
            {userState.state.user
              ? ` Welcome back, ${
                  userState.state.user.user_info?.name || 'User'
                }`
              : 'Welcome to Songfiy'}
            !
          </h1>
          <p className="text-md mt-4 text-gray-200">
            Dive into a world of endless melodies, trending hits, and timeless
            classics. Stream without limits, create playlists, and feel the
            rhythm wherever you are.
          </p>

          <div className="absolute bottom-0 flex justify-between items-center w-full lg:w-[35%]">
            <button
              type="button"
              className=" uppercase text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Listen now
            </button>
            <img src={RadioIcon} alt="radio" className="opacity-80 -mt-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeNavbar;
