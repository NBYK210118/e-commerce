import { createAsyncThunk } from '@reduxjs/toolkit';
import ProductApi from '../../services/product_api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY2QiLCJpYXQiOjE3MTIyMTc3OTIsImV4cCI6MTcxMjIyNDk5Mn0.BIP4GSO5WqCqMWjlqASITTuJKmTmERLX4Ps9DrVtQ1o';
export const getCategory = createAsyncThunk('category/getCategory', async ({ navigate }, { rejectWithValue }) => {
  try {
    const found = await AsyncStorage.getItem('categories');
    if (!found) {
      const response = await ProductApi.getAllCategories(TOKEN, navigate);
      await AsyncStorage.setItem('categories', JSON.stringify(response.data));
      return response.data;
    }
    const result = JSON.parse(found);
    return result;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
