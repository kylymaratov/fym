import { UserTypes } from '@/types/user.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitalState {
  user: UserTypes | null;
}

const initialState: InitalState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserTypes | null>) => {
      state.user = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
