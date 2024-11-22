import { createContext, ReactNode, useState } from 'react';
import { TUser } from '../../types/user.types';

interface UserContextState {
  state: {
    user: TUser | null;
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

function UserProvier({ children }: { children: ReactNode }) {
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

export { UserProvier, UserContext };
