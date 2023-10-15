import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8001/api",
})

api.defaults.withCredentials = true;

export default api;