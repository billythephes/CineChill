import axios from 'axios';

const axiosClient = axios.create();

// Interceptor for Request
axiosClient.interceptors.request.use(async (config: any) => {
    config.headers = {
        'Content-Type': 'application/json',
        ...config.headers,
    }
    config.data
    return config;
});

// Interceptor for Response
axiosClient.interceptors.response.use((response) => {
    if (response.status === 200 && response.data) {
        return response.data;
    }
    return response;
},
    error => {
        console.warn(`Failed to connect to database, ${error.message}`)
    });

export default axiosClient;