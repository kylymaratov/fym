export const base_url =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:5000/api/v1'
    : 'http://localhost:5001/api/v1';
