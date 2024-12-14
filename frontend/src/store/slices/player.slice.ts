import { SongTypes } from '@/types/song.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitalState {
  playNow: SongTypes | null;
  playing: boolean;
  queue: SongTypes[];
  playingTrigger: boolean;
}

const initialState: InitalState = {
  playNow: null,
  playing: false,
  queue: [],
  playingTrigger: false,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayNow: (state, action: PayloadAction<SongTypes | null>) => {
      state.playNow = action.payload;
    },
    setQueue: (state, action: PayloadAction<SongTypes[]>) => {
      state.queue = action.payload;
    },
    setPlaying: (state, action: PayloadAction<boolean>) => {
      state.playing = action.payload;
    },
    setPlayingTrigger: (state, action: PayloadAction<boolean>) => {
      state.playingTrigger = action.payload;
    },
  },
});

export const playerReducer = playerSlice.reducer;
export const playerActions = playerSlice.actions;
