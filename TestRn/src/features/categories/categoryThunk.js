import { createAsyncThunk } from '@reduxjs/toolkit';
import ProductApi from '../../services/product_api';

export const getCategory = createAsyncThunk('category/getCategory', async ({ navigate }, { rejectWithValue }) => {
  try {
    const response = await ProductApi.getAllCategories(navigate);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
