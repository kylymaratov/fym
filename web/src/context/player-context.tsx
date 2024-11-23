'use client';

import { SongTypes } from '@/types/song-types';
import { usePathname } from 'next/navigation';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface AppContextState {
  state: {
    playNow: SongTypes | null;
    repeat: boolean;
    shuffle: boolean;
    loading_progress: number;
    quality: 'low' | 'high';
    loading: boolean;
    last_volume: number;
    music_player: null | HTMLAudioElement;
  };
  setPlayerState: <K extends keyof typeof defaultValue.state>(
    action: K,
    value: (typeof defaultValue.state)[K],
  ) => void;
}

const defaultValue: AppContextState = {
  state: {
    playNow: null,
    repeat: false,
    shuffle: false,
    loading_progress: 0,
    quality: 'high',
    loading: false,
    last_volume: 0,
    music_player: null as HTMLAudioElement | null,
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
    setState((prevState) => ({ ...prevState, [action]: value }));
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setState((prevState) => ({
        ...prevState,
        music_player: new Audio(),
      }));
    }
  }, []);

  return (
    <PlayerContext.Provider value={{ state, setPlayerState }}>
      {children}
    </PlayerContext.Provider>
  );
}

export { PlayerProvider, PlayerContext };
