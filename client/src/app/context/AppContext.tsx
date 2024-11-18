import { createContext, ReactNode, useState } from 'react';

interface AppContextState {
  state: {
    theme: 'light' | 'dark';
    currentLocation: string;
    showAuth: 'login' | 'auth' | null;
  };
  setAppState: <K extends keyof typeof defaultValue.state>(
    action: K,
    value: (typeof defaultValue.state)[K],
  ) => void;
}

const defaultValue: AppContextState = {
  state: {
    theme: 'dark',
    currentLocation: '',
    showAuth: null,
  },
  setAppState: () => {},
};

const AppContext = createContext<AppContextState>(defaultValue);

function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<typeof defaultValue.state>(
    defaultValue.state,
  );

  const setAppState = <K extends keyof typeof defaultValue.state>(
    action: K,
    value: (typeof defaultValue.state)[K],
  ) => {
    setState({ ...state, [action]: value });
  };

  return (
    <AppContext.Provider value={{ state, setAppState }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppProvider, AppContext };
