import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../app/context/UserContext';

import { toastError } from '../scripts/toast.error';
import { UseRequest } from './UseRequest';

export const UseAuth = () => {
  const [appLoaded, setAppLoaded] = useState<boolean>(false);
  const { state, setUserState } = useContext(UserContext);
  const { request } = UseRequest();

  const getMe = async () => {
    try {
      const response = await request('/user/me');

      setUserState('user', response.data);
    } catch (error) {
      toastError(error);
      setUserState('user', null);
    } finally {
      setTimeout(() => {
        setAppLoaded(true);
      }, 1000);
    }
  };

  useEffect(() => {
    getMe();
  }, [state.access_token]);

  return { appLoaded };
};
