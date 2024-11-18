export const base_url =
  import.meta.env.MODE === 'production'
    ? '/api/v1'
    : 'http://localhost:5001/api/v1';
