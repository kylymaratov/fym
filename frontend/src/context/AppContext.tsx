'use client';

import { createContext, ReactNode, useState } from 'react';

interface AppContextState {
  state: {
    darkTheme: boolean;
    message: string;
  };
  setAppStore: <K extends keyof typeof defaultValue.state>(
    action: K,
    value: (typeof defaultValue.state)[K],
  ) => void;
}

const defaultValue: AppContextState = {
  state: {
    darkTheme: false,
    message: 'Hello from Next.js',
  },
  setAppStore: () => {},
};

const AppContext = createContext<AppContextState>(defaultValue);

function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<typeof defaultValue.state>(
    defaultValue.state,
  );

  const setAppStore = <K extends keyof typeof defaultValue.state>(
    action: K,
    value: (typeof defaultValue.state)[K],
  ) => {
    setState({ ...state, [action]: value });
  };

  return (
    <AppContext.Provider value={{ state, setAppStore }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppProvider, AppContext };
