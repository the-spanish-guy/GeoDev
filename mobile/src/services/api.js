import axios from 'axios'

const api = axios.create({
    baseURL: 'url for backend API'
})

export default api