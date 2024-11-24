'use client';

import { SongTypes } from '@/types/song-types';
import { createContext, ReactNode, useState } from 'react';

interface AppContextState {
  state: {
    search_result: SongTypes[];
  };
  setAppState: <K extends keyof typeof defaultValue.state>(
    action: K,
    value: (typeof defaultValue.state)[K],
  ) => void;
}

const defaultValue: AppContextState = {
  state: {
    search_result: [],
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
    setState((prevState) => ({ ...prevState, [action]: value }));
  };

  return (
    <AppContext.Provider value={{ state, setAppState }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppProvider, AppContext };
