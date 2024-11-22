import axios, { Method } from 'axios';
import { base_url } from './base-url';
import { cookies } from 'next/headers';

const api = axios.create({ baseURL: base_url, withCredentials: true });

api.interceptors.request.use(
  (request) => {
    request.headers.set('Content-Type', 'application/json');

    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default async function makeSSRRequest<T>(
  url: string,
  method: Method = 'GET',
  data: any = {},
  headers: any = {},
) {
  const cookieStore = await cookies();
  const session = cookieStore.get('connect.sid');
  const access_token = cookieStore.get('access_token');

  headers = {
    ...headers,
    'Content-Type': 'application/json',
    Cookie: `${session?.name}=${session?.value}; ${access_token?.name}=${access_token?.value}`,
  };

  const response = await axios<T>({
    url,
    method,
    data,
    headers,
  });

  return response.data;
}
