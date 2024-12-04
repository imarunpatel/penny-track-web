import { EllipsisVerticalIcon, FolderOpenIcon, TagIcon } from "@heroicons/react/24/outline";
import { useCategoryStore } from "../../store";
import { Button, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/16/solid'
import { CategoryAPI } from "../../apis/categoryAPI";
import toast from "react-simple-toasts";
import HorizontalLoader from "../../components/HorizontalLoader";
import { useState } from "react";
import AddCategory from "./components/AddCategory";

const Category = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { categories, deleteCategory } = useCategoryStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);


  const handleDelete = async (id: string) => {
    const consent = confirm('Are you sure you want to delete?');
    if(!consent) return;
    setLoading(true);
    try {
        const response = await CategoryAPI.delete(id);
        if(response.success) {
            toast('Deleted successfully');
            deleteCategory(id);
        }
    } catch (e) {

    } finally {
        setLoading(false);
    }
  }

  const createCategory = () => {
    setIsOpen(true);
  }
  return (
    <div className="page-container">
      <div className="max-w-lg mx-auto min-h-screen">
        <div className="content">
          <header className="flex gap-2 justify-between bg-violet-800 px-3 text-white py-4">
              <div className="flex items-center gap-2 text-lg">
                  Category <TagIcon width={20} />
              </div>
              <Button onClick={createCategory} className="px-4 py-2 rounded-md bg-violet-500">Add Category</Button>
          </header>
          <div className="">
              {loading && <HorizontalLoader />}
              {
                  categories?.length === 0 ? 
                  <>
                      <div>Not category found</div>
                  </> :
                  <>
                      {categories?.map(category => (
                          <div key={category.id} className="bg-violet-50 my-2 px-3 py-3 flex items-center justify-between gap-2 cursor-pointer">
                              <div className="flex">
                                  <div className="text-red-500"> <FolderOpenIcon /> </div>
                                  <div className="text-gray-500">{category.name}</div>
                              </div>
                              <div>
                                  <Actions onDelete={() => handleDelete(category.id)} />
                              </div>
                          </div>
                      ))}
                  </>
              }
          </div>
        </div>
      </div>
      <AddCategory isOpen={isOpen} setIsOpen={(status) => setIsOpen(status)} />
    </div>
  );
};

export default Category;


const Actions = ({ onDelete }: {onDelete: () => void}) => {
    return (
      <div className="">
        <Menu>
          <MenuButton className="inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold text-gray-500">
            <EllipsisVerticalIcon width={20} />
          </MenuButton>
  
          <MenuItems
            transition
            anchor="bottom end"
            className="w-52 origin-top-right rounded-xl border border-white/5 bg-violet-800/50 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
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