import { create } from "zustand";
import { ICategory } from "../models/Category";


interface CategoryStoreState {
    categories: ICategory[] | null;
    setAllCategory: (payload: ICategory[]) => void;
    addCategory: (payload: ICategory) => void;
    deleteCategory: (id: string) => void;
    clearCategory: () => void;
}


const useCategoryStore = create<CategoryStoreState>((set) => ({
    categories: null,
    setAllCategory: (categories: ICategory[]) => set({categories}),
    addCategory: (category: ICategory) => set((state) => {
        const updatedCateogry = state.categories;
        if(updatedCateogry) {
            updatedCateogry.push(category);
        }
        return { categories: updatedCateogry }
    }),
    deleteCategory: (id: string) => set((state) => {
        const categories = state.categories;
        const updatedCategories = categories?.filter(item => item.id !== id);
        return { categories: updatedCategories }
    }),
    clearCategory: () => set({categories: null})
}))


export default useCategoryStore;