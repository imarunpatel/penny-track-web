import { create } from "zustand";
import { IExpense } from "../models/Expense";
import { ICategory } from "../models/Category";
import { IMonthlyStats } from "../models/MonthlyStats";
import { formateToYearMonth } from "../utils/helpers/dateFormate";

export interface IExpenseWithCategory extends Omit<IExpense, 'categoryId'> {
    categoryId: ICategory
  }

interface ExpenseStoreState {
    expenses: Map<string, IExpenseWithCategory[]> | null; // data ==> expense
    stats: Map<string, IMonthlyStats> | null; // month ==> stats
    addExpenses: (date: string, payload: IExpenseWithCategory[]) => void;
    addExpense: (date: string, payload: IExpenseWithCategory) => void;
    updateExpense: (payload: IExpenseWithCategory, priceDiff: number, prevDate: string) => void;
    addStats: (payload: IMonthlyStats) => void;
    updateBudget: (yearMonth: string, budget: number) => void;
    deleteExpense: (expense: IExpense) => void;
}


const useExpenseStore = create<ExpenseStoreState>((set) => ({
    expenses: null,
    stats: null,
    addExpenses: (date: string, expenses: IExpenseWithCategory[]) => set((state) => {
        const updatedExpense = new Map(state.expenses)
        
        updatedExpense.set(date, expenses)
        return { expenses: updatedExpense};
    }),
    addExpense: (date: string, expense: IExpenseWithCategory) => set((state) => {
        const updatedExpense = new Map(state.expenses);
        const existingExpense = state.expenses?.get(date);

        const yearMonth = formateToYearMonth(new Date());
        if(yearMonth !== formateToYearMonth(new Date(date))) {
            return state;
        }
        const originalStats = new Map(state.stats);
        const updatedStats = originalStats.get(yearMonth);

        if(updatedStats) {
            if(updatedStats.stats[date]) {
                const existing = updatedStats.stats[date].find(item => item.category.id === expense.categoryId.id);
                if(existing) {
                    existing.expense = existing.expense + expense.amount;
                } else {
                    updatedStats.stats[date].push({category: expense.categoryId, expense: expense.amount })
                }
            } else {
                updatedStats.stats[date] = [{ category: expense.categoryId, expense: expense.amount }]
            }
        }
        updatedExpense.set(date, existingExpense ? [...existingExpense, expense] : [expense])
        return { expenses: updatedExpense, stats: originalStats };
    }),
    updateExpense: (expense: IExpenseWithCategory, priceDiff: number, prevDate: string) => set((state) => {
        const updatedExpense = new Map(state.expenses);
        if(expense.date === prevDate) {
            const existingExpense = updatedExpense.get(prevDate);
            const replacedExpense = existingExpense?.map(item => item.id === expense.id ? expense : item);
            if(replacedExpense) {
                updatedExpense.set(prevDate, replacedExpense);
            }
        } else  {
            // If date modified
            // remove from previous date
            const existingExpense = updatedExpense.get(prevDate);
            const filteredExpense = existingExpense?.filter(item => item.id !== expense.id);

            if(filteredExpense) {
                updatedExpense.set(prevDate, filteredExpense);
            }

            // Update to the new date
            const newExpense = updatedExpense.get(expense.date);
            if(newExpense) {
                // update to the new date if existing expenses are fetched otherwise leave it
                // becase some expense would be there which are not fetched
                const addedExpense = [...newExpense, expense]
                updatedExpense.set(expense.date, addedExpense)
            }

        }

        const yearMonth = formateToYearMonth(new Date());
        const updatedStats = new Map(state.stats);
        if(yearMonth === formateToYearMonth(new Date(expense.date))) {
            const newStats = updatedStats.get(yearMonth);
            if(newStats) {
                if(newStats.stats[expense.date]) {
                    const existing = newStats.stats[expense.date].find(item => item.category.id === expense.categoryId.id);
                    if(existing) {
                        existing.expense = existing.expense + priceDiff;
                    }
                }
            }
        }

        return { expenses: updatedExpense, stats: updatedStats };
    }),
    addStats: (stats: IMonthlyStats) => set((state) => {
        const updatedStats = new Map(state.stats);
        updatedStats.set(stats.yearMonth, stats);
        return { stats: updatedStats };
    }),
    updateBudget: (yearMonth: string, budget: number) => set((state) => {
        const updatedStats = new Map(state.stats);
        const stats = updatedStats.get(yearMonth)
        if(stats) {
            stats.budget = budget;
            updatedStats.set(stats?.yearMonth, stats);
        }
        return { stats: updatedStats }
    }),
    deleteExpense: (expense: IExpense) => set((state) => {
        const expenses = new Map(state.expenses);
        const currentExpense = expenses.get(expense.date);
        const filteredExpense = currentExpense?.filter(item => item.id !== expense.id);
        
        const updateStats = new Map(state.stats);
        if(formateToYearMonth(new Date()) == formateToYearMonth(new Date(expense.date))) {
            const updatedStats = updateStats.get(formateToYearMonth(new Date(expense.date)));
            if(updatedStats) {
                if(updatedStats.stats[expense.date]) {
                    const existing = updatedStats.stats[expense.date].find(item => item.category.id === expense.categoryId);
                    if(existing) {
                        existing.expense = existing.expense - expense.amount;
                    }
                }
            }
        }
        if(filteredExpense)
            expenses.set(expense.date, filteredExpense);
        return { expenses, stats: updateStats }
    })
}))


export default useExpenseStore;