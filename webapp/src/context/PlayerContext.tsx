import { SongTypes } from '@/types/song.types';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface PlayerContextState {
  state: {
    playNow: SongTypes | null;
    playing: boolean;
    playNext: SongTypes[];
    playingTrigger: boolean;
  };
  setPlayerState: <K extends keyof typeof defaultValue.state>(
    action: K,
    value: (typeof defaultValue.state)[K],
  ) => void;
}

const defaultValue: PlayerContextState = {
  state: {
    playNow: null,
    playing: false,
    playNext: [],
    playingTrigger: false,
  },
  setPlayerState: () => {},
};

const PlayerContext = createContext<PlayerContextState>(defaultValue);

function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<typeof defaultValue.state>(
    defaultValue.state,
  );

  const setPlayerState = <K extends keyof typeof defaultValue.state>(
    action: K,
    value: (typeof defaultValue.state)[K],
  ) => {
    setState((prevState) => ({ ...prevState, [action]: value }));
  };

  return (
    <PlayerContext.Provider value={{ state, setPlayerState }}>
      {children}
    </PlayerContext.Provider>
  );
}

export { PlayerProvider, PlayerContext };
