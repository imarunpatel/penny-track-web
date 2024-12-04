import { ICategory } from "./Category"

export interface IMonthlyStats {
    id: string
    yearMonth: string
    budget: number
    budgetSet: boolean
    categories: ICategory[]
    stats: { [Key: string] : {category: ICategory; expense: number}[] }
}