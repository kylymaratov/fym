'use client';

import api from '@/api/api';
import { useCallback, useContext } from 'react';
import { Method } from 'axios';
import { UserContext } from '@/context/user-context';

export const UseRequest = () => {
  const { state } = useContext(UserContext);

  const request = useCallback(
    async <T>(
      url: string,
      method: Method = 'GET',
      data: any = {},
      headers: any = {},
    ) => {
      return await api<T | any>({ url, method, data, headers });
    },
    [state.access_token],
  );

  return { request };
};
