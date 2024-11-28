import { SongTypes } from '@/types/song.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitalState {
  searchQuery: string;
  searchResult: SongTypes[];
}

const initialState: InitalState = {
  searchQuery: '',
  searchResult: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchResult: (state, action: PayloadAction<SongTypes[]>) => {
      state.searchResult = action.payload;
    },
  },
});

export const searchReducer = searchSlice.reducer;
export const searchActions = searchSlice.actions;
