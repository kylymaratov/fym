import { SongTypes } from '@/types/song.types';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface PlayerContextState {
  state: {
    playNow: SongTypes | null;
    repeat: boolean;
    shuffle: boolean;
    loadingProgress: number;
    quality: 'low' | 'high';
    loading: boolean;
    lastVolume: number;
    musicPlayer: HTMLAudioElement;
    playNext: SongTypes[];
  };
  setPlayerState: <K extends keyof typeof defaultValue.state>(
    action: K,
    value: (typeof defaultValue.state)[K],
  ) => void;
}

const defaultValue: PlayerContextState = {
  state: {
    playNow: null,
    repeat: false,
    shuffle: false,
    loadingProgress: 0,
    quality: 'high',
    loading: false,
    lastVolume: 0,
    musicPlayer: new Audio(),
    playNext: [],
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
