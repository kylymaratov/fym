export const baseUrl =
  import.meta.env.MODE === 'production'
    ? 'https://songfiy.online/api/v1'
    : 'http://localhost:5001/api/v1';
