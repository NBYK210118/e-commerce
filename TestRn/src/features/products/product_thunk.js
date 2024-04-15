import { createAsyncThunk } from '@reduxjs/toolkit';
import ProductApi from '../../services/product_api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DataService from '../../services/user_api';

export const getMostViewedProducts = createAsyncThunk(
  '/products/getMostViewedProducts',
  async ({ navigation }, { rejectWithValue }) => {
    try {
      const found = await AsyncStorage.getItem('mostviewedProducts');
      if (found) {
        const result = JSON.parse(found);
        return result;
      } else {
        const response = await ProductApi.getMostInterested(navigation);
        await AsyncStorage.setItem('mostviewedProducts', JSON.stringify(response.data));
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getSellinglist = createAsyncThunk(
  '/products/getSellingList',
  async ({ token, limit }, { rejectWithValue }) => {
    try {
      const response = await DataService.getSellinglist(token, limit);
      if (response.data) {
        return response.data.sellinglist.products;
      }
      return rejectWithValue('No products data available');
    } catch (error) {
      console.error('Error: ', error);
      if (error.response && error.response.data) {
        return rejectWithValue({ message: error.response.data.message || 'An unexpected error occured' });
      }
      return rejectWithValue({ message: 'An unexpected error occured' });
    }
  }
);

export const getDiscountingProducts = createAsyncThunk(
  'products/getDiscountingProducts',
  async ({ navigation }, { rejectWithValue }) => {
    try {
      const found = await AsyncStorage.getItem('DiscountingProducts');
      if (found) {
        const result = JSON.parse(found);
        return result;
      } else {
        const response = await ProductApi.getDiscountingProducts(navigation);
        await AsyncStorage.setItem('DiscountingProducts', JSON.stringify(response.data));
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getRecommendProduct = createAsyncThunk('products/getRecommendProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await ProductApi.getRecommendProduct();
    if (response.data) {
      await AsyncStorage.setItem('RecommendProducts', JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getWatchedProducts = createAsyncThunk(
  'products/getWatchedProducts',
  async ({ token, navigation }, { rejectWithValue }) => {
    try {
      const response = await ProductApi.userRecentWatched(token, navigation);
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProductStatus = createAsyncThunk(
  'products/updateProductStatus',
  async ({ token, data }, { rejectWithValue }) => {
    try {
      const response = await ProductApi.updateProductStatus(token, data);
      if (response.data) {
        return response.data.products;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
