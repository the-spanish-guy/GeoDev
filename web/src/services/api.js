import axios from 'axios'

const api = axios.create({
    baseURL: 'url for your backend API'    
});

export default api;