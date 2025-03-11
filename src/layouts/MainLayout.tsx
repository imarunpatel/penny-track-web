import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import { formateToYearMonth } from '../utils/helpers/dateFormate';
import { useEffect } from 'react';
import { useMonthlyExpense } from '../hooks/useMonthlyExpense';
import 'react-simple-toasts/dist/theme/dark.css';
import { toastConfig } from 'react-simple-toasts';

toastConfig({ theme: 'dark' });

const MainLayout = () => {
  const location = useLocation();
  const { getMonthlyExpense } = useMonthlyExpense();

  useEffect(() => {
    getMonthlyExpense(formateToYearMonth(new Date()))
  }, [])

  
  return (
    <div>
        <Outlet />
        {location.pathname !== '/' ? <Footer key={1} /> : null}
    </div>
  )
}

export default MainLayout