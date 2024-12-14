import { configureStore } from '@reduxjs/toolkit';
import { playerReducer } from './slices/player.slice';
import { appReducer } from './slices/app.slice';
import { userReducer } from './slices/user.slice';
import { searchReducer } from './slices/search.slice';
import { userApi } from '@/api/user.api';
import { songApi } from '@/api/song.api';
import { searchApi } from '@/api/search.api';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    app: appReducer,
    user: userReducer,
    search: searchReducer,
    [userApi.reducerPath]: userApi.reducer,
    [songApi.reducerPath]: songApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
  },
  middleware: (middlewares) =>
    middlewares()
      .concat(userApi.middleware)
      .concat(songApi.middleware)
      .concat(searchApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
