import axios from "axios";
import { BASE_URL } from "./constants";

const axiosInstance = axios.create({
    baseURL:BASE_URL,
    timeout:20000,
    headers:{
        "Content-Type":"application/json"
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        } 
        // console.log("Request Config:", config); 
        return config;
    },
    (error) => {
        console.error("Interceptor Error:", error); 
        return Promise.reject(error);
    }
);

export default axiosInstance;







