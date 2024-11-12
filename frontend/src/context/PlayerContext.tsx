'use client';

import { song_mock } from '@/mock/song.mock';
import { SongTypes } from '@/types/song.types';
import { createContext, ReactNode, useState } from 'react';

interface AppContextState {
  state: {
    playNow?: SongTypes;
  };
  setPlayerState: <K extends keyof typeof defaultValue.state>(
    action: K,
    value: (typeof defaultValue.state)[K],
  ) => void;
}

const defaultValue: AppContextState = {
  state: {
    playNow: undefined,
  },
  setPlayerState: () => {},
};

const PlayerContext = createContext<AppContextState>(defaultValue);

function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<typeof defaultValue.state>(
    defaultValue.state,
  );

  const setPlayerState = <K extends keyof typeof defaultValue.state>(
    action: K,
    value: (typeof defaultValue.state)[K],
  ) => {
    setState({ ...state, [action]: value });
  };

  return (
    <PlayerContext.Provider value={{ state, setPlayerState }}>
      {children}
    </PlayerContext.Provider>
  );
}

export { PlayerProvider, PlayerContext };
