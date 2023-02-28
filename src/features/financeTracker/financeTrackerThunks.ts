import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  CategoriesFromFirebase,
  Category,
  CategoryApi, Transaction,
  TransactionPost,
  TransactionsApi,
  TransactionsFromFirebase
} from "../../types";
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

export const createTransaction = createAsyncThunk<void, TransactionPost>(
  'financeTracker/createTransaction',
  async (transaction) => {
    await axiosApi.post('/transactions.json', transaction);
  }
);


export const fetchAllTransactions = createAsyncThunk<TransactionsApi[]>(
  'financeTracker/fetchAllTransactions',
  async () => {
    const [transactionsResponse, categoriesResponse] = await Promise.all([
      axiosApi.get<TransactionsFromFirebase>('/transactions.json'),
      axiosApi.get<CategoriesFromFirebase>('/categories.json')
    ]);

    const transactionsList = transactionsResponse.data || {};
    const categoriesList = categoriesResponse.data || {};

    const newTransactions = Object.entries(transactionsList).map(([id, transaction]) => {
      const category = categoriesList[transaction.category];
      if (!category) return null;

      return {
        type: category.type,
        name: category.name,
        amount: transaction.amount,
        createdAt: transaction.createdAt,
        id
      };
    }).filter(Boolean) as TransactionsApi[];

    newTransactions.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

    return newTransactions;
  }
);

export const removeTransaction = createAsyncThunk<void, string>(
  'financeTracker/removeTransaction',
  async (transactionId) => {
    await axiosApi.delete('/transactions/' + transactionId + '.json');
  }
);


export const fetchOneTransaction = createAsyncThunk<Transaction, string>(
  'financeTracker/fetchOneTransaction',
  async (id) => {
    const transactionResponse = await axiosApi.get<TransactionPost | null>('/transactions/' + id + '.json');
    const transaction = transactionResponse.data;
    let newTransaction: Transaction = {
      type: '',
      name: '',
      amount: 0,
      createdAt: '',
    }
    if (transaction === null) {
      throw new Error('Not found!');
    }
    const categoryResponse = await axiosApi.get<Category | null>('/categories/' + transaction.category + '.json');

    const category = categoryResponse.data;
    if (category) {
      newTransaction = {
        type: category.type,
        name: category.name,
        amount: transaction.amount,
        createdAt: transaction.createdAt,
      }
    }
    return newTransaction!;
  }
);

interface UpdateTransactionParams {
  id: string,
  transaction: TransactionPost,
}

export const updateTransaction = createAsyncThunk<void, UpdateTransactionParams>(
  'financeTracker/updateTransaction',
  async (params) => {
    await axiosApi.put('/transactions/' + params.id + '.json', params.transaction);
  }
);
