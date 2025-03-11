import { CalendarIcon, EllipsisVerticalIcon, FilmIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { formateDateToDDMMYYYY, formateDateToYYYYMMDD } from '../../utils/helpers/dateFormate'
import { useEffect, useState } from 'react'
import { ExpensesAPI } from '../../apis/expensesAPI'
import { useCategoryStore } from '../../store'
import useExpenseStore, { IExpenseWithCategory } from '../../store/expenseStore'
import Budget from './components/Budget'
import toast from 'react-simple-toasts'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import AddUpdateExpense from '../../components/AddUpdateExpense'
import HorizontalLoader from '../../components/HorizontalLoader'
import HorizantalDatePicker from './components/HorizantalDatePicker'
import DatePicker from 'react-datepicker'

const Home = () => {
  const { categories } = useCategoryStore();
  const {expenses, deleteExpense, stats, addExpenses} = useExpenseStore();
  const [selectedDate, setSelectedDate] = useState<string>(formateDateToYYYYMMDD(new Date()));
  const [currentDateExpenses, setCurrentDateExpense] = useState<IExpenseWithCategory[]>();
  const [selectedExpense, setSelectedExpense] = useState<IExpenseWithCategory>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [todaysExpense, setTodaysExpense] = useState(0);

  useEffect(() => {
    if(!expenses) {
      // getAllExpenses();
    } else {
      if(expenses) {
        const existingExpense = expenses.get(selectedDate);
        if(existingExpense) {
          setTodaysExpense(existingExpense.reduce((acc, curr) => acc + curr.amount, 0))
          setCurrentDateExpense(existingExpense);
        }
      }
    }
  }, [expenses, selectedDate, stats])


  const handleDateChagne = async (value:  string | null, from: 'calendar' | 'horizontal') => {
    if(!value) return;
    const date = from === 'calendar' ? value.split('T')[0] : value;
    setSelectedDate(date)
    console.log(expenses)
    const existingExpense = expenses!.get(date);
    if(existingExpense) {
      return;
    }
    try {
      setLoading(true);
      const fetchedExpenses = await ExpensesAPI.getAll(date, date);
      if(fetchedExpenses.success) {
        const modifiedExpenses = fetchedExpenses.data?.map(item => {
          const category = categories!.find(c => c.id === item.categoryId)
          return {...item, categoryId: category!}
        })
        addExpenses(date, modifiedExpenses? modifiedExpenses : []);
        setLoading(false);
      };
    } catch {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if(confirm('Are you sure you want to delete?')) {
      try {
        setLoading(true);
        const response = await ExpensesAPI.delete(id);
        if(response.success) {
          deleteExpense(response.data);
          toast('Deleted successfully');
          setLoading(false);
        }
      } catch {
        setLoading(false);
      }
    }
  }

  const handleEdit = async (expense: IExpenseWithCategory) => {
    setSelectedExpense(expense)
    setIsOpen(true)
  }

  // return (<Budget />)

  return (
    <main className="page-container ">
      <div className="max-w-lg mx-auto min-h-screen">
        {/* <Header /> */}
        <Budget />
        {/* Content */}
        <HorizantalDatePicker onSelect={(date) => handleDateChagne(date, 'horizontal')} />
        <div className="content px-3 mt-1 relative">
          {/* Today's Transactions */}
          {loading && <div className='absolute -top-[52px] left-0 z-10 w-full'><HorizontalLoader /></div>}
          <div className="mt-2 flex justify-between">
            <div className="text-md">Transactions <span className='text-blue-700 bg-gray-200 rounded-full px-2 font-semibold'>₹{todaysExpense.toFixed()}</span></div>
            <div>
              {/* <input value={selectedDate} onChange={(e) => handleDateChagne(e)} type="date" className='border rounded-xl px-2'/> */}

              <div className="relative home-date-picker-container">
                  <DatePicker 
                    dateFormat={'dd-MM-YYYY'}
                    showIcon={false}
                    calendarClassName="home-date-picker"
                    calendarIconClassName="" 
                    className="h-7 px-2  py-0 text-md w-32  bg-gray-50 border border-gray-300 rounded-lg" 
                    selected={new Date(selectedDate)} 
                    onChange={(date) => handleDateChagne(date!.toISOString(), 'calendar')} />
                    <CalendarIcon width={14} className="absolute right-2 top-2" />
                </div>

            </div>
          </div>

          <div className="items mt-2 flex flex-col gap-2">
            {(currentDateExpenses && currentDateExpenses.length > 0) ? currentDateExpenses.map((item, index) => (
              <div key={index} className="item rounded-md bg-gray-100 flex gap-2 items-center px-2">
                  <div className="icon w-16 p-2 my-2 rounded-md flex items-center justify-center bg-white">
                    <FilmIcon className="w-full text-red-300" />
                  </div>
                  <div className="details h-full w-full flex justify-between relative">
                    <div className="left">
                      <div className="text-lg">{item.title}</div>
                      <div className="text-gray-400 text-sm">{item.categoryId?.name ? item.categoryId?.name : 'Uncategorised' }</div>
                    </div>
                    <div className="right flex items-center">
                      <div>
                        <div className="text-lg text-right">₹{item?.amount ? item.amount : 0}</div>
                        <div className="text-gray-400 text-sm">{formateDateToDDMMYYYY(new Date(item.date))}</div>
                      </div>
                      <div>
                      </div>
                      <Actions onDelete={() => handleDelete(item.id)} onEdit={() => handleEdit(item)} />
                    </div>
                  </div>
              </div>
            )) : <div className='flex justify-center mt-8 text-gray-500'>No expense</div>}

            <div className='h-20'></div>
          </div>
        </div>
        <AddUpdateExpense 
          isOpen={isOpen} 
          setIsOpen={(state) => setIsOpen(state)} categories={categories} 
          type='Update'
          expense={selectedExpense}
        />
      </div>
    </main>
  )
}

export default Home;


const Actions = ({ onDelete, onEdit }: {onDelete: () => void; onEdit: () => void}) => {
  return (
    <div className="">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md py-1.5 pl-2 text-sm/6 font-semibold text-gray-500">
          <EllipsisVerticalIcon width={20} />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border border-white/5 bg-violet-800/50 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <button onClick={onEdit} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              <PencilIcon className="size-4 fill-white/30" />
              Edit
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘E</kbd>
            </button>
          </MenuItem>
          <MenuItem>
            <button onClick={onDelete} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              <TrashIcon className="size-4 fill-white/30" />
              Delete
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘D</kbd>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  )
}