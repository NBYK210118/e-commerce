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
  async ({ limit, navigation }, { rejectWithValue }) => {
    try {
      const response = await DataService.getSellinglist(token, limit, navigation);
      return response.data;
    } catch (error) {
      console.log('Error: ', error);
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
