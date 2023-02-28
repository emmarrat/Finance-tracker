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
