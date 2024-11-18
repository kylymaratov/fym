export interface TUser {
  id: number;
  user_sub_id: string;
  email: string;
  verified: boolean;
  created: string;
  updated: string;
  user_info?: {
    user_sub_id: string;
    first_name: string | null;
    last_name: string | null;
    about: string | null;
  };
}
