import { createAsyncThunk } from '@reduxjs/toolkit';
import ProductApi from '../../services/product_api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DataService from '../../services/user_api';

export const getMostViewedProducts = createAsyncThunk(
  '/products/getMostViewedProducts',
  async ({ navigation }, { rejectWithValue }) => {
    try {
      const response = await ProductApi.getMostInterested(navigation);
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.error('Error: ', error);
      if (error.response && error.response.data) {
        return rejectWithValue({ message: error.response.data.message || 'An unexpected error occured' });
      }
      return rejectWithValue({ message: 'An unexpected error occured' });
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
      const response = await ProductApi.getDiscountingProducts(navigation);
      return response.data;
    } catch (error) {
      console.error('Error: ', error);
      if (error.response && error.response.data) {
        return rejectWithValue({ message: error.response.data.message || 'An unexpected error occured' });
      }
      return rejectWithValue({ message: 'An unexpected error occured' });
    }
  }
);

export const getRecommendProduct = createAsyncThunk('products/getRecommendProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await ProductApi.getRecommendProduct();
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error('Error: ', error);
    if (error.response && error.response.data) {
      return rejectWithValue({ message: error.response.data.message || 'An unexpected error occured' });
    }
    return rejectWithValue({ message: 'An unexpected error occured' });
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
      console.error('Error: ', error);
      if (error.response && error.response.data) {
        return rejectWithValue({ message: error.response.data.message || 'An unexpected error occured' });
      }
      return rejectWithValue({ message: 'An unexpected error occured' });
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
      console.error('Error: ', error);
      if (error.response && error.response.data) {
        return rejectWithValue({ message: error.response.data.message || 'An unexpected error occured' });
      }
      return rejectWithValue({ message: 'An unexpected error occured' });
    }
  }
);

export const deleteSellingProducts = createAsyncThunk(
  'products/deleteProductStatus',
  async ({ token, data }, { rejectWithValue }) => {
    try {
      const response = await DataService.deleteProduct(token, data);
      if (response.data) {
        return response.data.products;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addProduct = createAsyncThunk('products/addProduct', async ({ token, data }, { rejectWithValue }) => {
  try {
    const response = await ProductApi.addProduct(token, data);
    if (response.data) {
      return response.data.products;
    }
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ token, data, id }, { rejectWithValue }) => {
    try {
      const response = await ProductApi.updateProduct(token, data, id);
      if (response.data) {
        return response.data.products;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const findProductByKeyword = createAsyncThunk(
  'products/findProductByKeyWord',
  async ({ token, data }, { rejectWithValue }) => {
    try {
      const response = await ProductApi.findByProductByKeyword(token, data);
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const findProductByCategory = createAsyncThunk(
  'products/findProductByCategory',
  async ({ token, data }, { rejectWithValue }) => {
    try {
      const response = await ProductApi.categoriesItem(token, data);
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
