import { TSong } from '../../types/song.types';

export interface TSearchResponse extends TSong {}

export interface TSearchRequest {
  query: string;
  limit: number;
  searchBy: 'all';
}

export interface TGetTokenRequest {}

export interface TGetTokenResponse {
  accessToken: string;
  expire: string;
  ip: string;
}
