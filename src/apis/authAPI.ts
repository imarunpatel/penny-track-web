import { IAPIResponse } from "../models/APIResponse"
import { IUser } from "../models/User"
import { api } from "./configs/axiosConfig"


export const AuthAPI = {
    login: async (accessToken: string) => {
        const response = await api.request({
            url: '/login',
            method: 'post',
            data: JSON.stringify({ accessToken, loginProvider: 'google' })
        })
        return response.data as IAPIResponse<IUser>
    },
    getUser: () => {
        const user = localStorage.getItem('data');
        return JSON.parse(user!) as IUser;
    },
    getToken: () => {
        const user = localStorage.getItem('data');
        if(!user) return '';
        return (JSON.parse(user!).token || '') as string;
    },
}