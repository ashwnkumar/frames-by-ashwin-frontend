import axios from "axios";
import { envConfig } from "./envConfig";

const axiosInstance = axios.create({
    baseURL: envConfig.API_BASE_URL,
    withCredentials: true,

})

axiosInstance.interceptors.request.use(
    (config) => {
        
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
)


export default axiosInstance
