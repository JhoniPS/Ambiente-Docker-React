import axios from 'axios';
import Cookies from 'js-cookie'

const api = axios.create({
    baseURL: "http://localhost:8001/api/",
});

api.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${Cookies.get('authToken')}`;
    config.headers.Accept = 'application/json';
    config.withCredentials = true;

    return config;
});

export default api;