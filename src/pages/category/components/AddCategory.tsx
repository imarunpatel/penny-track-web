import { FC, useState } from "react";
import { Sheet } from "react-modal-sheet";
import { CategoryAPI } from "../../../apis/categoryAPI";
import toast from "react-simple-toasts";
import { useCategoryStore } from "../../../store";

type Props = {
  isOpen: boolean;
  setIsOpen: (status: boolean) => void;
};

const AddCategory: FC<Props> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>("");
  const [cateogoryError, setCategoryError] = useState<boolean>(false);
  const { addCategory } = useCategoryStore()

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if(!categoryName || categoryName.length < 3) {
        setCategoryError(true);
        return;
    }
    try {
        setLoading(true);
        const response = await CategoryAPI.create(categoryName);
        if(response.success) {
            addCategory(response.data!)
            toast('Created successfully');
            props.setIsOpen(false);
            setCategoryName("")
        }
    } catch (e){
    
    } finally {
        setLoading(false);
    }
  };

  return (
    <div>
      <Sheet
        isOpen={props.isOpen}
        snapPoints={[210]}
        initialSnap={0}
        onClose={() => props.setIsOpen(false)}
        disableScrollLocking={true}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <div className="px-3">
              <form className={`w-full min-h-32 `}>
                <div className="mt-4">
                  <label
                    htmlFor="category"
                    className="block mb-1 text-sm font-medium text-gray-500 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    value={categoryName}
                    style={{ borderColor: cateogoryError ? "red" : "" }}
                    onChange={(e) => {
                      setCategoryName(e.target.value);
                      setCategoryError(false);
                    }}
                    type="text"
                    id="category"
                    className="h-9 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg  block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Food, Travel, Personal"
                    disabled={loading}
                    required
                  />
                  <small className="text-gray-400">
                    Category will be used to categorise your expenses
                  </small>

                  <div className="mt-3 flex justify-end">
                    {loading ? (
                      <button className="px-6 bg-violet-800 py-2 rounded-md text-white">
                        Loading
                      </button>
                    ) : (
                      <button
                        onClick={(e) => handleSubmit(e)}
                        className="px-6 bg-violet-800 py-2 rounded-md text-white"
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={() => props.setIsOpen(false)} />
      </Sheet>
    </div>
  );
};

export default AddCategory;
