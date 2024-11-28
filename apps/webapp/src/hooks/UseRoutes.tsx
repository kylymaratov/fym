import { RecentPage } from '@/pages/internal/RecentPage';
import { Container } from '@/pages/internal/Container';
import { HomePage } from '@/pages/internal/HomPage';
import { SearchPage } from '@/pages/internal/SearchPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LikedPage } from '@/pages/internal/LikedPage';
import { SongPage } from '@/pages/internal/SongPage';
import { useGetUserQuery } from '@/api/user.api';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { userActions } from '@/store/slices/user.slice';

export const UseRoutes = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { data } = useGetUserQuery(`?userId=${user?.id}`);

  useEffect(() => {
    if (data) {
      dispatch(userActions.setUser(data));
    }
  }, [data]);

  return (
    <Routes>
      {!user && (
        <>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </>
      )}

      <Route path="/" element={<Container />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="recently" element={<RecentPage />} />
        <Route path="liked" element={<LikedPage />} />
        <Route path="song/:songId" element={<SongPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
