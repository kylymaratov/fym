import { useCallback, useContext } from 'react';
import { UserContext } from '../app/context/UserContext';
import api from '../api/api';
import { Method } from 'axios';

export const UseRequest = () => {
  const { state } = useContext(UserContext);

  const request = useCallback(
    async (
      url: string,
      method: Method = 'GET',
      data: any = {},
      headers: any = {},
    ) => {
      const access_token =
        state.access_token || localStorage.getItem('access_token');

      if (access_token) {
        headers['Authorization'] = `Bearer ${access_token}`;
      }

      return await api({ url, method, data, headers });
    },
    [state.access_token],
  );

  return { request };
};
