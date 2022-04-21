import axios from "axios"
import jsCookie from "js-cookie"

const API_URL = `http://localhost:2000`

const axiosInstance = axios.create({
    baseURL: API_URL
})

axiosInstance.interceptors.request.use((config) => {
    config.headers.authorization = jsCookie.get("user_token") || ""

    return config
})

export default axiosInstance