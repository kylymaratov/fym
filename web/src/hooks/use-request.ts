'use client';

import api from '@/api/api';
import { useCallback, useContext } from 'react';
import { Method } from 'axios';

export const UseRequest = () => {
  const request = useCallback(
    async <T>(
      url: string,
      method: Method = 'GET',
      data: any = {},
      headers: any = {},
    ) => {
      return await api<T | any>({ url, method, data, headers });
    },
    [],
  );

  return { request };
};
