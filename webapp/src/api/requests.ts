import { useContext, useEffect, useState } from 'react';
import { UseApi } from './api';
import { UserContext } from '@/context/UserContext';
import { DataContext, DataContextState } from '@/context/DataContext';
import { UserTypes } from '@/types/user.types';

export const UseGetMe = () => {
  const userState = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { request } = UseApi();

  useEffect(() => {
    setLoading(true);
    request<UserTypes>('/user/me')
      .then((response) => {
        userState.setUserState('user', response.data);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  return { loading, error, user: userState.state.user };
};

export const UseGetData = <T>(
  dataName: string,
  url: string,
  withAuth?: boolean,
) => {
  const { state, setDataState } =
    useContext<DataContextState<T | null>>(DataContext);
  const userState = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { request } = UseApi();

  const doRequest = async () => {
    if (url !== state[dataName]?.url) {
      setLoading(true);
      request<T>(url)
        .then((response) => {
          setDataState(dataName, {
            data: response.data,
            url,
          });
        })
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    if (withAuth) {
      if (userState.state.user) {
        doRequest();
      }
    } else {
      doRequest();
    }
  }, [url, withAuth, userState.state.user]);

  return { loading, error, data: state[dataName]?.data };
};
