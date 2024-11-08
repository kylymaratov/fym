import { useMemo } from 'react';
import { RiCompassDiscoverLine } from 'react-icons/ri';
import { IoSearchOutline } from 'react-icons/io5';
import { MdFavoriteBorder } from 'react-icons/md';
import { useAppSelector } from '../../app/hooks';
import { Link } from 'react-router-dom';

const menuItems = [
  {
    title: 'Discover',
    icon: RiCompassDiscoverLine,
    href: '/',
  },
  {
    title: 'Search',
    icon: IoSearchOutline,
    href: '/search',
  },
];

const loggedMenuItems = [
  {
    title: 'Favorites',
    icon: MdFavoriteBorder,
    href: '/favorites',
  },
];

export const Navigation: React.FC = () => {
  const { appLocation } = useAppSelector((state) => state.app);
  const { isAuth } = useAppSelector((state) => state.user);

  const menuList = useMemo(() => {
    if (isAuth) {
      loggedMenuItems.forEach((item) => {
        menuItems.push(item);
      });
    }

    return menuItems;
  }, []);

  return (
    <div className="w-[80px] shadow-md shadow-secondary rounded-lg pl-1 pr-1">
      {menuList.map((item, index) => (
        <Link to={item.href} key={index}>
          <div
            className={`${
              appLocation === item.href && 'bg-gray-500'
            } mt-5 w-full hover:bg-gray-500 rounded-lg cursor-pointer duration-150`}
          >
            <item.icon size={30} className="m-auto" />
            <p className="mt-2 text-sm text-center">{item.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
