import { IAPIResponse } from "../models/APIResponse"
import { ICategory } from "../models/Category"
import { AuthAPI } from "./authAPI"
import { api } from "./configs/axiosConfig"


export const CategoryAPI = {
    create: async (name: string) => {
        const response = await api.request({
            url: '/category',
            method: 'post',
            data: JSON.stringify({name}),
            headers: {
                'Authorization': `Bearer ${AuthAPI.getToken()}`
            },
        })
        return response.data as IAPIResponse<ICategory>
    },
    get: async () => {
        const response = await api.request({
            url: '/category',
            method: 'get',
            headers: {
                'Authorization': `Bearer ${AuthAPI.getToken()}`
            },
        })
        return response.data as IAPIResponse<ICategory[]>
    },
    delete: async (id: string) => {
        const response = await api.request({
            url: `/category/${id}`,
            method: 'delete',
            headers: {
                'Authorization': `Bearer ${AuthAPI.getToken()}`
            },
        })
        return response.data as IAPIResponse<null>
    },
}