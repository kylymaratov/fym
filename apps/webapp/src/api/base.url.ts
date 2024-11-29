export const baseUrl =
  import.meta.env.MODE === 'production'
    ? 'http://localhost:5000/api/v1'
    : 'http://localhost:5001/api/v1';
