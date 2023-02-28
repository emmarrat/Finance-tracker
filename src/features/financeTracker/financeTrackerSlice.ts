import {Category, CategoryApi, Transaction, TransactionsApi} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {
  createCategory,
  createTransaction, fetchAllTransactions,
  fetchCategories,
  fetchOneCategory, fetchOneTransaction,
  removeCategory, removeTransaction,
  updateCategory, updateTransaction
} from "./financeTrackerThunks";
import {RootState} from "../../app/store";

interface FinanceTrackerState {
  categories: CategoryApi[];
  category: Category | null;
  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  removeLoading: false | string;
  transactions: TransactionsApi[];
  oneTransaction: Transaction | null;
}

const initialState: FinanceTrackerState = {
  categories: [],
  category: null,
  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  removeLoading: false,
  transactions: [],
  oneTransaction: null,
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
    builder.addCase(fetchOneCategory.pending, state => {
      state.fetchLoading = true;
      state.category = null;
    });
    builder.addCase(fetchOneCategory.fulfilled, (state, {payload: category}) => {
      state.fetchLoading = false;
      state.category = category;
    });
    builder.addCase(fetchOneCategory.rejected, state => {
      state.fetchLoading = false;
    });
    builder.addCase(updateCategory.pending, state => {
      state.updateLoading = true;
    });
    builder.addCase(updateCategory.fulfilled, state => {
      state.updateLoading = false;
    });
    builder.addCase(updateCategory.rejected, state => {
      state.updateLoading = false;
    });
    builder.addCase(createTransaction.pending, state => {
      state.createLoading = true;
    });
    builder.addCase(createTransaction.fulfilled, state => {
      state.createLoading = false;
    });
    builder.addCase(createTransaction.rejected, state => {
      state.createLoading = false;
    });
    builder.addCase(fetchAllTransactions.pending, state => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchAllTransactions.fulfilled, (state, {payload: transaction}) => {
      state.fetchLoading = false;
      state.transactions = transaction;
    });
    builder.addCase(fetchAllTransactions.rejected, state => {
      state.fetchLoading = false;
    });
    builder.addCase(removeTransaction.pending, (state, {meta: {arg: transactionId}}) => {
      state.removeLoading = transactionId;
    });
    builder.addCase(removeTransaction.fulfilled, state => {
      state.removeLoading = false;
    });
    builder.addCase(removeTransaction.rejected, state => {
      state.removeLoading = false;
    });

    builder.addCase(fetchOneTransaction.pending, state => {
      state.fetchLoading = true;
      state.oneTransaction = null;
    });
    builder.addCase(fetchOneTransaction.fulfilled, (state, {payload: transaction}) => {
      state.fetchLoading = false;
      state.oneTransaction = transaction;
    });
    builder.addCase(fetchOneTransaction.rejected, state => {
      state.fetchLoading = false;
    });
    builder.addCase(updateTransaction.pending, state => {
      state.updateLoading = true;
    });
    builder.addCase(updateTransaction.fulfilled, state => {
      state.updateLoading = false;
    });
    builder.addCase(updateTransaction.rejected, state => {
      state.updateLoading = false;
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
export const selectTransactions = (state: RootState) => state.financeTracker.transactions;
export const selectOneTransaction = (state: RootState) => state.financeTracker.oneTransaction;



