import axios, { AxiosError} from "axios";
import toast from "react-simple-toasts";

export const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
})

api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError) => {
        handlePromiseError(error);
        return Promise.reject(error)
    }
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handlePromiseError = (error: AxiosError | any)  => {
    // if(error.response?.data)
    toast(error.response?.data.error || 'Something went wrong!')
    if(error.status === 401) {
        window.location.href = '/login'
    }
}