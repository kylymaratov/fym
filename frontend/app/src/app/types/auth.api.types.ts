import { TUser } from '../../types/user.types';

export interface TLoginApiRequest {
  email: string;
  password: string;
}

export interface TLoginApiResponse extends TUser {}

export interface TSignupReuqest {
  email: string;
  password: string;
}

export interface TSignupResponse {
  message: string;
}
