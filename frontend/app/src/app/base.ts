const devHost = 'http://localhost:5000/api/v1';

const baseUrl = import.meta.env.MODE === 'development' ? devHost : '/api/v1';

export default baseUrl;
