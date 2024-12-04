import { ChangeEvent, useEffect, useState } from "react";
import { formateDateToYYYYMMDD } from "../utils/helpers/dateFormate";
import { ICategory } from "../models/Category";
import { ExpensesAPI } from "../apis/expensesAPI";
import { IExpense } from "../models/Expense";
import useExpenseStore, { IExpenseWithCategory } from "../store/expenseStore";
import { Sheet } from "react-modal-sheet";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "@heroicons/react/24/outline";
import Dropdown from "./Dropdown";

interface FormData {
  title: string;
  amount: number | "";
  date: Date;
  categoryId: string;
  description?: string;
}

const initialState: FormData = {
  title: "",
  amount: "",
  date: new Date(),
  categoryId: "",
};

interface BottomSheetProps {
  type: 'Add' | 'Update';
  expense?: IExpenseWithCategory
  isOpen: boolean;
  setIsOpen: (status: boolean) => void;
  categories: ICategory[] | null;
}

const AddUpdateExpense = ({ isOpen, setIsOpen, categories, type, expense }: BottomSheetProps) => {
  const { addExpense, updateExpense } = useExpenseStore();
  const [formData, setFormData] = useState<FormData>(initialState);
  const [formError, setFormError] = useState({
    title: false,
    amount: false,
    date: false,
    categoryId: false,
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const modifiedCategory: {key: string; value: string}[] = categories?.map(item => ({key: item.id, value: item.name})) || []

  useEffect(() => {
    if(type === 'Update') {
      if(expense) {
        const initialFormValue: FormData = {
          amount: expense?.amount,
          title: expense?.title,
          categoryId: expense?.categoryId.id,
          date: new Date(expense.date),
          description: expense.description
          
        }
        setFormData(initialFormValue)
      }
    } 
  }, [type, isOpen])

  const handleOnChange = (
    event: ChangeEvent<
      HTMLInputElement | 
      HTMLSelectElement | 
      HTMLTextAreaElement
    > 
  ) => {
    const { id, value }: any = event.target;
    const updatedData = { ...formData, [id]: value };
    setFormData(updatedData);
    validateExpenseForm(updatedData);
  };

  const handleCategorySelect = (value: string) => {
    const updated = {...formData, categoryId: value};
    setFormData(updated)
    validateExpenseForm(updated)
  }

  const handleDateChange = (date: Date | null) => {
    if(date)
    setFormData({...formData, ['date']: date})
  }



  const handleSubmit = async () => {
      setFormSubmitted(true);
      if (validateExpenseForm(formData)) {
        setLoading(true);
        try {
          let formValues: Omit<IExpense, "id"> = {
            ...formData,
            amount: +formData.amount!,
            date: formateDateToYYYYMMDD(formData.date)
          };

          if(type == 'Add') {
            const response = await ExpensesAPI.create(formValues);
            if(response.success) {
              const category = categories?.find(
                (item) => item.id === response.data?.categoryId
              );
              if (category) {
                const exp: IExpenseWithCategory = {
                  ...response.data!,
                  categoryId: category,
                };
                addExpense(exp.date, exp);
              }
            }
          } else if(type === 'Update') {
            if(!expense) return;
            const response = await ExpensesAPI.update(expense?.id, formValues);
            if(response.success) {
              const category = categories?.find(
                (item) => item.id === response.data?.categoryId
              );
              if (category) {
                const exp: IExpenseWithCategory = {
                  ...response.data!,
                  categoryId: category,
                };
                const priceDiff = Number(formValues.amount) - expense.amount
                updateExpense(exp, priceDiff, expense.date);
              }
            }
          }
          setLoading(false);
          setFormData(initialState);
          setFormSubmitted(false);
          setIsOpen(false);
        } catch (e) {
          setLoading(false);
        }
      }
  };

  const validateExpenseForm = (formData: FormData): boolean => {
    const newErrors = {
      title: false,
      amount: false,
      date: false,
      categoryId: false,
    };

    newErrors.title = formData.title ? false : true;
    if (!formData.amount || formData.amount <= 0) newErrors.amount = true;
    if (!formData.date) newErrors.date = true;
    if (!formData.categoryId) newErrors.categoryId = true;

    setFormError(newErrors);
    return !(Object.values(newErrors).filter((item) => item).length > 0);
  };

  return (
    <Sheet disableScrollLocking={true} isOpen={isOpen} onClose={() => setIsOpen(false)}  snapPoints={[410]} initialSnap={0}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>

        <div className="px-3 add-expense">
          <div className="flex gap-2 mb-2">
            <div className="text-md text-violet-800">
              {type} Expense
            </div>
          </div>

          {/* Expense Form */}
          <div>
          <div className="mb-2 relative">
            <Dropdown  
              options={modifiedCategory} 
              onSelect={(value) => handleCategorySelect(value)} 
              placeholder="Select Category"
              required={formSubmitted && formError.categoryId}
              defaultValue={formData.categoryId}
            />
              {/* <label
                htmlFor="first_name"
                className="block text-xs font-medium text-gray-500 dark:text-white"
              >
                Category
              </label>
              <input type="text" 
                className="h-9 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg  block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
              <div className="w-full bg-white rounded-md absolute z-10 border hidden">
                <div className="items px-3 py-1 border-b hover:bg-gray-100 cursor-pointer">fdfds</div>
                <div className="items px-3 py-1 border-b">fdfds</div>
                <div className="items px-3 py-1 border-b">fdfds</div>
              </div> */}
              {/* <select
                value={formData.categoryId}
                onChange={(e) => handleOnChange(e)}
                id="categoryId"
                style={{
                  borderColor:
                    formError.categoryId && formSubmitted ? "red" : "",
                }}
                className="h-9 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full px-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              >
                <option value="">Select category</option>
                {categories &&
                  categories.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select> */}
            </div>
            <div className="mb-2">
              <label
                htmlFor="title"
                className="block text-xs font-medium text-gray-500 dark:text-white"
              >
                Title
              </label>
              <input
                value={formData.title}
                onChange={(e) => handleOnChange(e)}
                type="text"
                id="title"
                style={{
                  borderColor: formError.title && formSubmitted ? "red" : "",
                }}
                className="h-9 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg  block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Fruit Juice"
                required
              />
            </div>
            <div className="flex gap-2">
              <div className="mb-2 flex-1">
                <label
                  htmlFor="amount"
                  className="block text-xs font-medium text-gray-500 dark:text-white"
                >
                  Amount
                </label>
                <input
                  value={formData.amount}
                  onChange={(e) => handleOnChange(e)}
                  type="number"
                  id="amount"
                  style={{
                    borderColor: formError.amount && formSubmitted ? "red" : "",
                  }}
                  className="h-9 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg  block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="₹250"
                  required
                />
              </div>
              <div className="mb-2 flex-1">
                <label
                  htmlFor="date"
                  className="block text-xs font-medium text-gray-500 dark:text-white"
                >
                  Date
                </label>
                {/* <div onClick={handleDateClick} className="flex items-center justify-between h-9 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                    {formData.date}
                    <CalendarIcon width={18} />
                </div> */}
                {/* <input ref={dateRef}
                  value={formData.date}
                  onChange={(e) => handleOnChange(e)}
                  type="date"
                  id="date"
                  style={{
                    borderColor: formError.date && formSubmitted ? "red" : "",
                  }}
                  className="h-9 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg  block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Food"
                  required
                /> */}
                <div className="relative add-update-expense">
                  <DatePicker 
                    dateFormat={'dd-MM-YYYY'}
                    showIcon={false}
                    calendarClassName=""
                    calendarIconClassName="text-lg" 
                    className="h-9 px-3 py-1 flex-1 w-full bg-gray-50 border border-gray-300 rounded-lg" 
                    selected={formData.date} 
                    onChange={(date) => handleDateChange(date)} />
                    <CalendarIcon width={20} className="absolute right-2 top-2" />
                </div>
              </div>
            </div>
           

            <div className="mb-2">
              <label
                htmlFor="first_name"
                className="block text-xs font-medium text-gray-500 dark:text-white"
              >
                Description (Optional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleOnChange(e)}
                id="description"
                rows={4}
                className="h-16 block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Describe your expense here..."
              ></textarea>
            </div>
            <div>
            {loading ? (
              <button className="w-full bg-violet-800 py-3 rounded-md text-white">
                Loading
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="w-full bg-violet-800 py-3 rounded-md text-white"
              >
                {type}
              </button>
            )}
          </div>
          </div>
        </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={() => setIsOpen(false)} />
    </Sheet>
  )
}

export default AddUpdateExpense;