import { toast } from 'react-toastify';

export const toastError = (error: any) => {
  toast(
    error?.response?.data?.errResponse?.message ||
      error?.message ||
      'Unknown error',
    {
      type: 'error',
    },
  );
};
