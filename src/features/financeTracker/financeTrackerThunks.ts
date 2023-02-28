import {createAsyncThunk} from "@reduxjs/toolkit";
import {Category} from "../../types";
import axiosApi from "../../axiosApi";

export const createCategory = createAsyncThunk<void, Category>(
  'financeTracker/createCategory',
  async (category) => {
    await axiosApi.post('/categories.json', category);
  }
);