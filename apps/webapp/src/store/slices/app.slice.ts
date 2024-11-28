import { createSlice } from '@reduxjs/toolkit';

interface InitalState {}

const initialState: InitalState = {};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
});

export const appReducer = appSlice.reducer;
export const appActions = appSlice.actions;
