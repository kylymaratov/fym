'use client';

import InDev from '@/components/in-dev';
import { UserContext } from '@/context/user-context';
import { useContext } from 'react';

function UserProfilePage() {
  const { state } = useContext(UserContext);

  return (
    <div className="text-center">
      <div>{state.user?.user_info?.name}</div>
      <div className="mt-5">
        <InDev />
      </div>
    </div>
  );
}

export default UserProfilePage;
