import { useContext, useMemo } from 'react';
import ProfileIcon from '@/assets/icons/profile.svg';
import SettingsIcon from '@/assets/icons/settings.svg';
import UseVisible from '@/hooks/UseVisible';
import { UserTypes } from '@/types/user.types';
import { Link } from 'react-router-dom';
import { UseApi } from '@/api/api';
import { PlayerContext } from '@/context/PlayerContext';

interface Props {
  user: UserTypes;
  setUserState: (action: any, value: any) => void;
}

function ProfileBadge({ user, setUserState }: Props) {
  const { ref, isComponentVisible, setIsComponentVisible } = UseVisible(false);
  const { request } = UseApi();
  const { setPlayerState } = useContext(PlayerContext);
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
      await request('/auth/logout');
      setUserState('user', null);
      setPlayerState('playNow', null);
      window.location.reload();
    } catch (error) {}
  };

  return (
    <div className="relative" ref={ref}>
      <div
        className="w-[44px] h-[44px] bg-slate-600 flex justify-center items-center rounded-full cursor-pointer"
        onClick={() => setIsComponentVisible(!isComponentVisible)}
      >
        <span className="uppercase text-fond text-lg">
          {user.user_info?.name
            ? user.user_info.name.slice(0, 1)
            : 'User'.slice(0, 1)}
        </span>
      </div>
      {isComponentVisible && (
        <div className="absolute right-0 p-2 w-[200px] rounded-lg bg-secondary shadow-md shadow-slate-900">
          <div>
            {profile_menu.map((profile) => (
              <Link key={profile.href} to={profile.href}>
                <div className="my-2 cursor-pointer hover:bg-gray-900 p-2 rounded-md flex items-center justify-start">
                  <img src={profile.icon} alt="profile" />
                  <span className="text-sm ml-3">{profile.title}</span>
                </div>
              </Link>
            ))}
            <button
              className="my-2 w-full p-2 cursor-pointer hover:bg-gray-900 rounded-md"
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
