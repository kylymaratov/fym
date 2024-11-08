import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/user.slice';
import { authApi } from './apis/auth.api';
import { userApi } from './apis/user.api';
import { songReducer } from './slices/song.slice';
import { songApi } from './apis/song.api';
import { appReducer } from './slices/app.slice';
import { playerReducer } from './slices/player.slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    song: songReducer,
    app: appReducer,
    player: playerReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [songApi.reducerPath]: songApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(songApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
