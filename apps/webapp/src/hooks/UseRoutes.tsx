import { UseGetMe } from '@/api/requests';
import { RecentPage } from '@/pages/internal/RecentPage';
import { Container } from '@/pages/internal/Container';
import { HomePage } from '@/pages/internal/HomPage';
import { SearchPage } from '@/pages/internal/SearchPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LikedPage } from '@/pages/internal/LikedPage';
import { SongPage } from '@/pages/internal/SongPage';

export const UseRoutes = () => {
  const { user } = UseGetMe();

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
