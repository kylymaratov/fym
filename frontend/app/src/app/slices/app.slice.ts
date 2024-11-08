import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  appLocation: string;
}

const initialState: InitialState = {
  appLocation: '/',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.appLocation = action.payload;
    },
  },
});

export const { setLocation } = appSlice.actions;
export const appReducer = appSlice.reducer;
