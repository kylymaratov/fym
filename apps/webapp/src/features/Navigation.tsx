'use server';

import LogoIcon from '@/assets/images/logo.svg';
import { useMemo } from 'react';
import HomeIcon from '@/assets/icons/home.svg';
import RecentIcon from '@/assets/icons/recent.svg';
import LikedIcon from '@/assets/icons/liked.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import CloudICon from '@/assets/icons/cloud.svg';
import SearchIcon from '@/assets/icons/search.svg';
import { Link } from 'react-router-dom';

function Navigatiion() {
  const discover = useMemo(
    () => [
      {
        title: 'Home',
        href: '/',
        icon: HomeIcon,
      },
      {
        title: 'Search',
        href: '/search',
        icon: SearchIcon,
      },
    ],
    [],
  );
  const library = useMemo(
    () => [
      {
        title: 'Recent',
        href: '/recently',
        icon: RecentIcon,
      },
      {
        title: 'Liked songs',
        href: '/liked',
        icon: LikedIcon,
      },
      {
        title: 'Saved',
        href: '/saved',
        icon: CloudICon,
      },
    ],
    [],
  );

  return (
    <div className="bg-secondary h-full lg:block hidden overflow-hidden w-[300px] px-[30px] py-[37px]">
      <div className="pointer-events-none select-none">
        <img src={LogoIcon} alt="logo" loading="lazy" />
      </div>
      <div className="mt-[34px]">
        <span className="uppercase font-bold">discover</span>
        <div>
          {discover.map((m) => (
            <Link to={m.href} key={m.href}>
              <div className="flex text-sm items-center my-4 ml-0.5 hover:text-gray-400">
                <img src={m.icon} alt={m.title} />
                <span className="ml-2">{m.title}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-[47px]">
          <span className="uppercase font-bold">library</span>
          <div>
            {library.map((m) => (
              <Link to={m.href} key={m.href}>
                <div className="flex text-sm  items-center my-4 ml-0.5 hover:text-gray-400">
                  <img src={m.icon} alt={m.title} />
                  <span className="ml-2">{m.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-[47px]">
          <span className="uppercase font-bold">your playlists</span>
          <div>
            <button type="button" className="flex items-center ml-0.5 mt-4">
              <img src={PlusIcon} alt="plus" />
              <span className="ml-2 text-sm">Create playlist</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigatiion;
