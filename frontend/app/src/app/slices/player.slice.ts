import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TSong } from '../../types/song.types';
import { song_mock } from '../../mocks/song.mock';

interface InitialState {
  playNow: TSong | null;
}

const initialState: InitialState = {
  playNow: song_mock,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayNow: (state, action: PayloadAction<TSong>) => {
      state.playNow = action.payload;
    },
  },
});

export const { setPlayNow } = playerSlice.actions;
export const playerReducer = playerSlice.reducer;
