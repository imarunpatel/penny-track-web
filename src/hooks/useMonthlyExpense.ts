import { ExpensesAPI } from "../apis/expensesAPI";
import { useCategoryStore } from "../store";
import useExpenseStore from "../store/expenseStore";
import { formateDateToYYYYMMDD } from "../utils/helpers/dateFormate";


export const useMonthlyExpense = () => {
  const { setAllCategory } = useCategoryStore();
  const { addStats, addExpenses } = useExpenseStore();

  const getMonthlyExpense = async (yearMonth: string) => {
    try {
      const stats = await ExpensesAPI.monthlyStats(yearMonth);
      const expenses = await ExpensesAPI.getAll(
        formateDateToYYYYMMDD(new Date()),
        formateDateToYYYYMMDD(new Date())
      );

      if (stats.success && expenses.success) {
        const modifiedExpenses = expenses.data.map(item => {
          const category = stats.data.categories.find(c => c.id === item.categoryId);
          return { ...item, categoryId: category! };
        });

        addExpenses(formateDateToYYYYMMDD(new Date()), modifiedExpenses!);
        setAllCategory(stats.data?.categories);
        addStats(stats.data!);
      }
    } catch (e) {
      console.error("Error fetching monthly expense data", e);
    }
  };

  return { getMonthlyExpense };
};
