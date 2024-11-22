'use client';

import { UserTypes } from '@/types/user-types';
import { createContext, ReactNode, useState } from 'react';

interface UserContextState {
  state: {
    user: UserTypes | null;
    access_token: string;
  };
  setUserState: <K extends keyof typeof defaultValue.state>(
    action: K,
    value: (typeof defaultValue.state)[K],
  ) => void;
}

const defaultValue: UserContextState = {
  state: {
    user: null,
    access_token: '',
  },
  setUserState: () => {},
};

const UserContext = createContext<UserContextState>(defaultValue);

function UserProvier({
  children,
  user,
}: {
  children: ReactNode;
  user?: UserTypes;
}) {
  const [state, setState] = useState<typeof defaultValue.state>({
    ...defaultValue.state,
    user: user || null,
  });

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
