import { createAsyncThunk } from '@reduxjs/toolkit';
import ProductApi from '../../services/product_api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getMostViewedProducts = createAsyncThunk(
  '/products/getMostViewedProducts',
  async ({ navigation }, { rejectWithValue }) => {
    try {
      const found = AsyncStorage.getItem('mostviewedProducts');
      if (!(found.length > 0)) {
        const response = await ProductApi.getMostInterested(navigation);
        AsyncStorage.setItem('mostviewedProducts', JSON.stringify(response.data));
        return response.data;
      }
      return found;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getDiscountingProducts = createAsyncThunk(
  'products/getDiscountingProducts',
  async ({ navigation }, { rejectWithValue }) => {
    try {
      const found = AsyncStorage.getItem('DiscountingProducts');
      if (!(found.length > 0)) {
        const response = await ProductApi.getDiscountingProducts(navigation);
        AsyncStorage.setItem('DiscountingProducts', JSON.stringify(response.data));
        return response.data;
      }
      return found;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
