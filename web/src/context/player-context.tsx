'use client';

import { SongTypes } from '@/types/song-types';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface AppContextState {
  state: {
    playNow: SongTypes | null;
    currentTime: number;
    duration: number;
    volume: number;
    paused: boolean;
    repeat: boolean;
    shuffle: boolean;
    loading_progress: number;
    quality: 'low' | 'high';
    loading: boolean;
    last_volume: number;
    error_message: string;
    times: {
      start: string;
      end: string;
    };
    audioRef: HTMLAudioElement | null;
  };
  setPlayerState: <K extends keyof typeof defaultValue.state>(
    action: K,
    value: (typeof defaultValue.state)[K],
  ) => void;
}

const defaultValue: AppContextState = {
  state: {
    playNow: null,
    currentTime: 0,
    duration: 0,
    volume: 70,
    paused: true,
    repeat: false,
    shuffle: false,
    loading_progress: 0,
    quality: 'high',
    loading: false,
    last_volume: 0,
    error_message: '',
    times: {
      start: '00:00',
      end: '00:00',
    },
    audioRef: null,
  },
  setPlayerState: () => {},
};

const PlayerContext = createContext<AppContextState>(defaultValue);

function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<typeof defaultValue.state>(
    defaultValue.state,
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setState((prevState) => ({
        ...prevState,
        audioRef: new Audio(),
      }));
    }
  }, []);

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
