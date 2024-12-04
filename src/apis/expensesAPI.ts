import { IAPIResponse } from "../models/APIResponse"
import { IExpense } from "../models/Expense"
import { IMonthlyStats } from "../models/MonthlyStats"
import { AuthAPI } from "./authAPI"
import { api } from "./configs/axiosConfig"



export const ExpensesAPI = {
    getAll: async (startDate: string, endDate: string) => {
        const response = await api.request({
            url: `/expense?startDate=${startDate}&endDate=${endDate}`,
            method: 'get',
            headers: {
                'Authorization': `Bearer ${AuthAPI.getToken()}`
            }
        })
        return response.data as IAPIResponse<IExpense[]>
    },
    create: async (expense: Omit<IExpense, 'id'>) => {
        const response = await api.request({
            url: `/expense`,
            method: 'post',
            data: JSON.stringify(expense),
            headers: {
                'Authorization': `Bearer ${AuthAPI.getToken()}`
            }
        })
        return response.data as IAPIResponse<IExpense>
    },
    update: async (id: string, expense: Omit<IExpense, 'id'>) => {
        const response = await api.request({
            url: `/expense/${id}`,
            method: 'patch',
            data: JSON.stringify(expense),
            headers: {
                'Authorization': `Bearer ${AuthAPI.getToken()}`
            }
        })
        return response.data as IAPIResponse<IExpense>
    },
    delete: async (id: string) => {
        const response = await api.request({
            url: `/expense/${id}`,
            method: 'delete',
            headers: {
                'Authorization': `Bearer ${AuthAPI.getToken()}`
            }
        })
        return response.data as IAPIResponse<IExpense>
    },
    monthlyStats: async (yearMonth: string) => {
        const response = await api.request({
            url: `/expense/stats?yearMonth=${yearMonth}`,
            method: 'get',
            headers: {
                'Authorization': `Bearer ${AuthAPI.getToken()}`
            }
        })
        return response.data as IAPIResponse<IMonthlyStats>
    },
    createBudget: async (budget: {}) => {
        const response = await api.request({
            url: `/expense/budget`,
            method: 'post',
            data: JSON.stringify(budget),
            headers: {
                'Authorization': `Bearer ${AuthAPI.getToken()}`
            }
        })
        return response.data as IAPIResponse<IMonthlyStats>;
    },
    updateBudget: async (id: string, budget: number) => {
        const response = await api.request({
            url: `/expense/budget/${id}`,
            method: 'patch',
            data: JSON.stringify({budget}),
            headers: {
                'Authorization': `Bearer ${AuthAPI.getToken()}`
            }
        })
        return response.data as IAPIResponse<IMonthlyStats>;
    }
}