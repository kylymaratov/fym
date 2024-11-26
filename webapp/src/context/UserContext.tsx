import { UserTypes } from '@/types/user.types';
import { createContext, ReactNode, useState } from 'react';

interface UserContextState {
  state: {
    user: UserTypes | null;
  };
  setUserState: <K extends keyof typeof defaultValue.state>(
    action: K,
    value: (typeof defaultValue.state)[K],
  ) => void;
}

const defaultValue: UserContextState = {
  state: {
    user: null,
  },
  setUserState: () => {},
};

const UserContext = createContext<UserContextState>(defaultValue);

function UserProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<typeof defaultValue.state>(
    defaultValue.state,
  );

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

export { UserProvider, UserContext };
