export interface IExpense {
    id: string
    title: string
    description?: string
    categoryId: string
    amount: number
    date: string
}