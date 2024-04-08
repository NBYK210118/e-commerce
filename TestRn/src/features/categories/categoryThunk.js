import { createAsyncThunk } from '@reduxjs/toolkit';
import ProductApi from '../../services/product_api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY2QiLCJpYXQiOjE3MTIyMTc3OTIsImV4cCI6MTcxMjIyNDk5Mn0.BIP4GSO5WqCqMWjlqASITTuJKmTmERLX4Ps9DrVtQ1o';
export const getCategory = createAsyncThunk('category/getCategory', async ({ navigate }, { rejectWithValue }) => {
  try {
    const found = AsyncStorage.getItem('categories');
    if (!found.length > 0) {
      const response = await ProductApi.getAllCategories(TOKEN, navigate);
      AsyncStorage.setItem('categories', JSON.stringify(response.data));
      return response.data;
    }
    return found;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
