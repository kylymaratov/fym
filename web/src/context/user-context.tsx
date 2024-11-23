'use client';

import { base_url } from '@/api/base-url';
import { UseRequest } from '@/hooks/use-request';
import { UserTypes } from '@/types/user-types';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface UserContextState {
  state: {
    user: UserTypes | null;
    check_auth: boolean;
  };
  setUserState: <K extends keyof typeof defaultValue.state>(
    action: K,
    value: (typeof defaultValue.state)[K],
  ) => void;
}

const defaultValue: UserContextState = {
  state: {
    user: null,
    check_auth: false,
  },
  setUserState: () => {},
};

const UserContext = createContext<UserContextState>(defaultValue);

function UserProvier({ children }: { children: ReactNode }) {
  const [state, setState] = useState<typeof defaultValue.state>(
    defaultValue.state,
  );
  const { request } = UseRequest();

  const fetchUser = async () => {
    try {
      const { data } = await request<UserTypes>(base_url + '/user/me');
      setState((prevState) => ({ ...prevState, user: data || null }));
    } catch {}
  };

  useEffect(() => {
    fetchUser();
  }, [state.check_auth]);

  const setUserState = <K extends keyof typeof defaultValue.state>(
    action: K,
    value: (typeof defaultValue.state)[K],
  ) => {
    setState((prevState) => ({ ...prevState, [action]: value }));
  };

  return (
    <UserContext.Provider value={{ state, setUserState }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvier, UserContext };
