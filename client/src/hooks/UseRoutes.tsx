import { Navigate, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../app/context/UserContext';
import LoginPage from '@/pages/auth/LoginPage';
import SignupPage from '@/pages/auth/SignupPage';
import AppWrapper from '@/pages/public/AppWrapper';
import DiscoverPage from '@/pages/public/DiscoverPage';
import HomePage from '@/pages/public/HomePage';
import FavoritePage from '@/pages/private/FavoritePage';
import UserPage from '@/pages/private/UserPage';

export const UseAppRoutes = () => {
  const {
    state: { user },
  } = useContext(UserContext);
  return (
    <Routes>
      {!user ? (
        <>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </>
      ) : (
        <>
          <Route path="me" element={<UserPage />} />
        </>
      )}
      <Route path="app" element={<AppWrapper />}>
        <Route index element={<HomePage />} />
        <Route path="discover" element={<DiscoverPage />} />
        <Route path="favorites" element={<FavoritePage />} />
      </Route>
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
};
