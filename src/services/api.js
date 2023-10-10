import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8001/api",
})


export default api;