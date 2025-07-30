import axios from "axios";

const api = axios.create({
    baseURL : import.meta.env.VITE_PUBLIC_BASE_API_URL,
    setTimeout : 10000,
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config
    },
    (error) => {
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response) => response, 
    (error) => {
        if(error.response) {
            console.log(error)
        } else if (error.response.status === 401) {
            console.warn('unauthorized! Redirect to login page ...');
            window.location.href = '/login'
        }
        return Promise.reject(error);
    }
);

export default api;