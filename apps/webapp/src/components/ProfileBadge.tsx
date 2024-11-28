import { useMemo } from 'react';
import ProfileIcon from '@/assets/icons/profile.svg';
import SettingsIcon from '@/assets/icons/settings.svg';
import UseVisible from '@/hooks/UseVisible';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useLazyUserLogoutQuery } from '@/api/user.api';
import { userActions } from '@/store/slices/user.slice';
import { playerActions } from '@/store/slices/player.slice';

function ProfileBadge() {
  const { ref, isComponentVisible, setIsComponentVisible } = UseVisible(false);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [userLogout] = useLazyUserLogoutQuery();

  const profile_menu = useMemo(
    () => [
      {
        title: 'Profile',
        href: '/user/profile',
        icon: ProfileIcon,
      },
      {
        title: 'Settings',
        href: '/settings',
        icon: SettingsIcon,
      },
    ],
    [],
  );

  const logout = async () => {
    try {
      await userLogout('').unwrap();
      dispatch(userActions.setUser(null));
      dispatch(playerActions.setPlayNow(null));
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <div
        className="w-[44px] h-[44px] bg-red-600 flex justify-center items-center rounded-full cursor-pointer"
        onClick={() => setIsComponentVisible(!isComponentVisible)}
      >
        <span className="uppercase text-fond text-lg">
          {user ? user.user_info?.name.slice(0, 1) : 'User'.slice(0, 1)}
        </span>
      </div>
      {isComponentVisible && (
        <div className="absolute right-0 p-2 w-[200px] rounded-lg bg-hover shadow-md shadow-slate-900">
          <div>
            {profile_menu.map((profile) => (
              <Link key={profile.href} to={profile.href}>
                <div className="my-2 cursor-pointer hover:bg-secondary p-2 rounded-md flex items-center justify-start">
                  <img src={profile.icon} alt="profile" />
                  <span className="text-sm ml-3">{profile.title}</span>
                </div>
              </Link>
            ))}
            <button
              className="my-2 w-full p-2 cursor-pointer hover:bg-secondary rounded-md"
              onClick={logout}
            >
              <span className="text-red-400 text-center text-sm ">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileBadge;
