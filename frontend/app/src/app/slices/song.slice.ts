import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TSong } from '../../types/song.types';

interface InitialState {
  searchResult: TSong[];
}

const initialState: InitialState = {
  searchResult: [],
};

const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setSearchResult: (state, action: PayloadAction<TSong[]>) => {
      state.searchResult = action.payload;
    },
  },
});

export const { setSearchResult } = songSlice.actions;
export const songReducer = songSlice.reducer;
