import {Category, CategoryApi} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createCategory, fetchCategories, removeCategory} from "./financeTrackerThunks";
import {RootState} from "../../app/store";

interface FinanceTrackerState {
  categories: CategoryApi[];
  category: Category | null;
  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  removeLoading: false | string;

}

const initialState: FinanceTrackerState = {
  categories: [],
  category: null,
  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  removeLoading: false,

}

export const financeTrackerSlice = createSlice({
  name: 'financeTracker',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createCategory.pending, state => {
      state.createLoading = true;
    });
    builder.addCase(createCategory.fulfilled, state => {
      state.createLoading = false;
    });
    builder.addCase(createCategory.rejected, state => {
      state.createLoading = false;
    });
    builder.addCase(fetchCategories.pending, state => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, {payload: categories}) => {
      state.fetchLoading = false;
      state.categories = categories;
    });
    builder.addCase(fetchCategories.rejected, state => {
      state.fetchLoading = false;
    });
    builder.addCase(removeCategory.pending, (state, {meta: {arg: categoryId}}) => {
      state.removeLoading = categoryId;
    });
    builder.addCase(removeCategory.fulfilled, state => {
      state.removeLoading = false;
    });
    builder.addCase(removeCategory.rejected, state => {
      state.removeLoading = false;
    });
  }
});



export const financeTrackerReducer = financeTrackerSlice.reducer;

export const selectAllCategories = (state: RootState) => state.financeTracker.categories;
export const selectOneCategory = (state: RootState) => state.financeTracker.category;
export const selectCreateLoading = (state: RootState) => state.financeTracker.createLoading;
export const selectUpdateLoading = (state: RootState) => state.financeTracker.updateLoading;
export const selectFetchLoading = (state: RootState) => state.financeTracker.fetchLoading;
export const selectRemoveLoading = (state: RootState) => state.financeTracker.removeLoading;


