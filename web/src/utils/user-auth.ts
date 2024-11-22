'use server';

import { base_url } from '@/api/base-url';
import makeSSRRequest from '@/api/ssr-api';
import { UserTypes } from '@/types/user-types';

async function UserAuth() {
  try {
    const response = await makeSSRRequest<UserTypes>(base_url + '/user/me');

    return response;
  } catch (error) {
    return undefined;
  }
}

export default UserAuth;
