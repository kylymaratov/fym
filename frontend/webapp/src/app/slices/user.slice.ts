import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../../types/user.types';

interface InitialState {
  isAuth: boolean;
  user: TUser | null;
}

const initialState: InitialState = {
  isAuth: false,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAUth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, setAUth } = userSlice.actions;
export const userReducer = userSlice.reducer;
