import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import { ExpensesAPI } from '../apis/expensesAPI';
import { formateDateToYYYYMMDD, formateToYearMonth } from '../utils/helpers/dateFormate';
import { useCategoryStore } from '../store';
import useExpenseStore from '../store/expenseStore';
import { useEffect } from 'react';

const MainLayout = () => {
  const location = useLocation();
  const {setAllCategory } = useCategoryStore();
  const { addStats, addExpenses } = useExpenseStore();

  useEffect(() => {
    getMonthlyExpense(formateToYearMonth(new Date()))
  }, [])


  const getMonthlyExpense = async (yearMonth: string) => {
    try {
      const stats = await ExpensesAPI.monthlyStats(yearMonth);
      const expenses = await ExpensesAPI.getAll(formateDateToYYYYMMDD(new Date()), formateDateToYYYYMMDD(new Date()));

      if(stats.success && expenses.success) {
        // console.log('stats', stats.data)
        const modifiedExpenses = expenses.data.map(item => {
          const category = stats.data.categories.find(c => c.id === item.categoryId)
          return {...item, categoryId: category!}
        })
        addExpenses(formateDateToYYYYMMDD(new Date()), modifiedExpenses!)

        setAllCategory(stats.data?.categories);
        addStats(stats.data!)
      }
    } catch (e) {
    }
  }

  
  return (
    <div>
        <Outlet />
        {location.pathname !== '/' ? <Footer key={1} /> : null}
    </div>
  )
}

export default MainLayout