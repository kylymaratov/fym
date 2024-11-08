import { useEffect, useState } from 'react';
import { useGetUserQuery } from '../app/apis/user.api';
import { useAppDispatch } from '../app/hooks';
import { setAUth, setUser } from '../app/slices/user.slice';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';

export const UseRoutes = () => {
  const dispatch = useAppDispatch();
  const { data, isSuccess, isFetching } = useGetUserQuery('');

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAUth(true));
      dispatch(setUser(data));
    }
  }, [data]);

  if (isFetching) return;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
};
