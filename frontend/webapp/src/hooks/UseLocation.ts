import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { setLocation } from '../app/slices/app.slice';

export const UseLocation = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLocation(location.pathname));
  }, [location.pathname]);
};
