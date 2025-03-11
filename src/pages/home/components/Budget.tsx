import { useEffect, useState } from "react";
import { Button, Dialog, DialogPanel, DialogTitle, Input } from "@headlessui/react";
import clsx from 'clsx';
import { ExpensesAPI } from "../../../apis/expensesAPI";
import { formateToYearMonth } from "../../../utils/helpers/dateFormate";
import useExpenseStore from "../../../store/expenseStore";
import { ICategory } from "../../../models/Category";

const Budget = () => {
    const { stats, addStats, updateBudget } = useExpenseStore();
    const [isOpen, setIsOpen] = useState(false)
    const [budgetValue, setBudgetValue] = useState<string>('');
    const [budgetError, setBudgetError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [type, setType] = useState<'Set' | 'Update'>();
    const [statsLoading, setStatsLoading] = useState<boolean>(true);
    const today = new Date().toLocaleDateString('default', { month: 'long' })
    let totalExpense = null;
    let balance = null;
    let budget = null;
    let percentage = 0;

    const currentMonth = formateToYearMonth(new Date());
    const selectedStats = stats?.get(currentMonth);

    if(selectedStats) {
      const data: {category: ICategory; expense: number }[] = [];
      console.log('da', selectedStats.stats, data)
        Object.values(selectedStats.stats).forEach(item => {
          data.push(...item)
        })

        totalExpense = data.reduce((acc, curr) => acc + curr.expense, 0)
        budget = selectedStats.budget;
        balance = (budget - totalExpense).toFixed(2);
        percentage = ((totalExpense * 100)/budget)/100
    }

    useEffect(() => {
      if(!stats) { /* empty */ } else {
        setStatsLoading(false);
      }
    }, [stats])

    const sumbit = async () => {
      if(!budgetValue || budgetValue.length > 10) {
        setBudgetError(true);
        return;
      }
      setBudgetError(false);
      try {
        setLoading(true);
        if(type === 'Set') {
          const response = await ExpensesAPI.createBudget({budget: Number(budgetValue), yearMonth: formateToYearMonth(new Date())});
          if(response.success)
          addStats(response.data)
        }
        if(type === 'Update') {
          const response = await ExpensesAPI.updateBudget(selectedStats!.id, Number(budgetValue))
          if(response.success) {
            const {yearMonth, budget } = response.data;
            updateBudget(yearMonth, budget)
          }
        }
      } catch { /* empty */ } finally {
        setLoading(false);
        setIsOpen(false);
      }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setBudgetValue(value);
      if(!value || Number(value) === 0 || value.length > 10) {
        setBudgetError(true);
        return;
      }
      setBudgetError(false);
    }
   
    
    function openModal(type: 'Set' | 'Update') {
      setType(type);
      setIsOpen(true)
    }
  
    function closeModal() {
      setIsOpen(false);
      setBudgetError(false);
    }

  
    return (
      <>
        <div className='bg-violet-800'>

          {
            statsLoading ?

            <div role="status" className="h-40 px-3 flex flex-col justify-center max-w-sm animate-pulse">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                <span className="sr-only">Loading...</span>
            </div>

        : 
        <>
          {
            selectedStats?.budgetSet ?
            <div className="h-40 px-3 flex flex-col justify-center">
              <div className='flex items-center justify-center gap-2 w-full text-center text-gray-300'>
                <div>{today}</div>
                Budget
                <svg onClick={() => openModal('Update')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-300 cursor-pointer">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
              </div>
              <div className='flex items-end gap-2 mt-2'>
                <div className='text-3xl text-white'>₹{balance}</div>
                <div className='text-white'>Balance</div>
              </div>

            {/* Progress */}
            <div className='w-full mt-2 flex bg-gray-400/30 rounded-xl'>
              <div className='h-3 bg-lime-300 rounded-xl' style={{flex: percentage}}></div>
            </div>
            <div className='text-white text-sm'>
              ₹{totalExpense?.toFixed(2)} spent of ₹{selectedStats?.budget}
            </div>
          </div>
          : 
          <div className="h-40 px-3 flex flex-col justify-center">
            <div className="w-full flex justify-center">
              <button onClick={() => openModal('Set')} className="bg-gray-200/50 px-6 py-1 rounded-full mb-2 text-gray-50 border">Set Budget</button>
            </div>
            <p className="text-gray-400 text-sm text-center">Budget is not set for this month.</p>
          </div>
          }
        </>

        }
        </div>
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={closeModal}>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/40">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel transition className="w-full bg-white max-w-md rounded-xl bg-green p-6 duration-75  ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
              <DialogTitle as="h3" className="text-base/7 font-medium text-black">
                {type} {today} Budget
              </DialogTitle>
              <Input type="number" value={budgetValue} onChange={(e) => onChange(e)}
                className={clsx(
                  `text-lg mt-3 block w-full rounded-lg ${budgetError ? 'border-red-600': ''}  border bg-black/5 py-1.5 px-3 text-black',
                  'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25`
                )} disabled={loading}
                placeholder="Enter amount. eg: 10000"
              />
              <div className="w-full flex justify-end mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-violet-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700 disabled:bg-gray-400"
                  onClick={sumbit} disabled={loading}
                >
                  {loading ? 'Loading...' : 'Submit'}
                </Button>
              </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </>
    )
}

export default Budget;