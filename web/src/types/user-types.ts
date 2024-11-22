export interface UserTypes {
  id: number;
  user_sub_id: string;
  email: string;
  verified: boolean;
  created: string;
  updated: string;
  user_info?: {
    user_sub_id: string;
    name: string;
    about: string | null;
  };
}
