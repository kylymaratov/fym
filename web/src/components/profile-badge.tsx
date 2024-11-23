'use client';

import { UserTypes } from '@/types/user-types';
import { useMemo } from 'react';
import ProfileIcon from '@/assets/icons/profile.svg';
import Image from 'next/image';
import SettingsIcon from '@/assets/icons/settings.svg';
import UseVisible from '@/hooks/use-visible';
import Link from 'next/link';
import { UseRequest } from '@/hooks/use-request';
import { useRouter } from 'next/navigation';

interface Props {
  user: UserTypes;
  setUserState: (action: any, value: any) => void;
}

function ProfileBadge({ user, setUserState }: Props) {
  const { ref, isComponentVisible, setIsComponentVisible } = UseVisible(false);
  const { request } = UseRequest();
  const router = useRouter();
  const profile_menu = useMemo(
    () => [
      {
        title: 'Profile',
        href: '/app/user/profile',
        icon: ProfileIcon,
      },
      {
        title: 'Settings',
        href: '/app/app/settings',
        icon: SettingsIcon,
      },
    ],
    [],
  );

  const logout = async () => {
    try {
      await request('/auth/logout');
      setUserState('user', null);
      router.refresh();
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
              <Link key={profile.href} href={profile.href}>
                <div className="my-2 cursor-pointer hover:bg-gray-900 p-2 rounded-md flex items-center justify-start">
                  <Image src={profile.icon} alt="profile" />
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
