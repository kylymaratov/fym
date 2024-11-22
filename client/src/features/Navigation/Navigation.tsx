import { MdHome } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { RiCompassDiscoverFill } from 'react-icons/ri';
import { MdFavorite } from 'react-icons/md';
import { useMemo } from 'react';
import { Logo } from '@/components/Logo';

export const Navigation = () => {
  const location = useLocation();
  const menuList = useMemo(
    () => [
      {
        title: 'Home',
        href: '/app',
        icon: MdHome,
      },
      {
        title: 'Discover',
        href: '/app/discover',
        icon: RiCompassDiscoverFill,
      },
      {
        title: 'Favorites',
        href: '/app/favorites',
        icon: MdFavorite,
      },
    ],
    [],
  );

  return (
    <div className="w-1/5 border-r-secondary border-r-2 p-2">
      <div>
        <Logo />
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-200 mt-2 mb-2">Navigation</p>
        {menuList.map((menu) => (
          <Link to={menu.href} key={menu.href}>
            <div
              className={`flex justify-start items-center mt-3 cursor-pointer duration-200 w-full p-2 rounded-md ${location.pathname === menu.href ? 'bg-secondary' : ''}`}
            >
              <menu.icon size={24} />
              <span className="ml-4 text-sm">{menu.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
