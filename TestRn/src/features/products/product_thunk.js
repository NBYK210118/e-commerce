import { createAsyncThunk } from '@reduxjs/toolkit';
import ProductApi from '../../services/product_api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DataService from '../../services/user_api';

export const getCategory = createAsyncThunk('/products/getCategory', async ({ navigate }, { rejectWithValue }) => {
  try {
    const response = await ProductApi.getAllCategories(navigate);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      return rejectWithValue({
        message: error.response.data.message || 'Unknown error occurred',
        status: error.response.status,
      });
    } else {
      return rejectWithValue({
        message: error.message || 'Network error',
        status: 500,
      });
    }
  }
});

export const getMostViewedProducts = createAsyncThunk(
  '/products/getMostViewedProducts',
  async ({ navigation }, { rejectWithValue }) => {
    try {
      const response = await ProductApi.getMostInterested(navigation);
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      if (error.response) {
        return rejectWithValue({
          message: error.response.data.message || 'Unknown error occurred',
          status: error.response.status,
        });
      } else {
        return rejectWithValue({
          message: error.message || 'Network error',
          status: 500,
        });
      }
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
      if (error.response) {
        return rejectWithValue({
          message: error.response.data.message || 'Unknown error occurred',
          status: error.response.status,
        });
      } else {
        return rejectWithValue({
          message: error.message || 'Network error',
          status: 500,
        });
      }
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
      if (error.response) {
        return rejectWithValue({
          message: error.response.data.message || 'Unknown error occurred',
          status: error.response.status,
        });
      } else {
        return rejectWithValue({
          message: error.message || 'Network error',
          status: 500,
        });
      }
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
    if (error.response) {
      return rejectWithValue({
        message: error.response.data.message || 'Unknown error occurred',
        status: error.response.status,
      });
    } else {
      return rejectWithValue({
        message: error.message || 'Network error',
        status: 500,
      });
    }
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
      if (error.response) {
        return rejectWithValue({
          message: error.response.data.message || 'Unknown error occurred',
          status: error.response.status,
        });
      } else {
        return rejectWithValue({
          message: error.message || 'Network error',
          status: 500,
        });
      }
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
      if (error.response) {
        return rejectWithValue({
          message: error.response.data.message || 'Unknown error occurred',
          status: error.response.status,
        });
      } else {
        return rejectWithValue({
          message: error.message || 'Network error',
          status: 500,
        });
      }
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
      if (error.response) {
        return rejectWithValue({
          message: error.response.data.message || 'Unknown error occurred',
          status: error.response.status,
        });
      } else {
        return rejectWithValue({
          message: error.message || 'Network error',
          status: 500,
        });
      }
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
    if (error.response) {
      return rejectWithValue({
        message: error.response.data.message || 'Unknown error occurred',
        status: error.response.status,
      });
    } else {
      return rejectWithValue({
        message: error.message || 'Network error',
        status: 500,
      });
    }
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
      if (error.response) {
        return rejectWithValue({
          message: error.response.data.message || 'Unknown error occurred',
          status: error.response.status,
        });
      } else {
        return rejectWithValue({
          message: error.message || 'Network error',
          status: 500,
        });
      }
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
      if (error.response) {
        return rejectWithValue({
          message: error.response.data.message || 'Unknown error occurred',
          status: error.response.status,
        });
      } else {
        return rejectWithValue({
          message: error.message || 'Network error',
          status: 500,
        });
      }
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
      if (error.response) {
        return rejectWithValue({
          message: error.response.data.message || 'Unknown error occurred',
          status: error.response.status,
        });
      } else {
        return rejectWithValue({
          message: error.message || 'Network error',
          status: 500,
        });
      }
    }
  }
);
