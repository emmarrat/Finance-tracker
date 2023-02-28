import {createAsyncThunk} from "@reduxjs/toolkit";
import {CategoriesFromFirebase, Category, CategoryApi} from "../../types";
import axiosApi from "../../axiosApi";

export const createCategory = createAsyncThunk<void, Category>(
  'financeTracker/createCategory',
  async (category) => {
    await axiosApi.post('/categories.json', category);
  }
);


export const fetchCategories = createAsyncThunk<CategoryApi[]>(
  'financeTracker/fetchAllCategories',
  async () => {
    const categoriesResponse = await axiosApi.get<CategoriesFromFirebase | null>('/categories.json');
    const categoriesList = categoriesResponse.data;

    let newCategories: CategoryApi[] = [];
    if (categoriesList) {
      newCategories = Object.keys(categoriesList).map(id => {
        const category = categoriesList[id];
        return {
          ...category,
          id
        }
      });
    }
    return newCategories;
  }
);


export const removeCategory = createAsyncThunk<void, string>(
  'financeTracker/removeCategory',
  async (categoryId) => {
    await axiosApi.delete('/categories/' + categoryId + '.json');
  }
);


export const fetchOneCategory = createAsyncThunk<Category, string>(
  'financeTracker/fetchOneCategory',
  async (id) => {
    const categoryResponse = await axiosApi.get<Category | null>('/categories/' + id + '.json');
    const category = categoryResponse.data;
    if (category === null) {
      throw new Error('Not found!');
    }
    return category;
  }
);

interface UpdateCategoryParams {
  id: string,
  category: Category,
}

export const updateCategory = createAsyncThunk<void, UpdateCategoryParams>(
  'financeTracker/updateCategory',
  async (params) => {
    await axiosApi.put('/categories/' + params.id + '.json', params.category);
  }
);
