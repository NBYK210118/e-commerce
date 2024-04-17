import { createSlice } from '@reduxjs/toolkit';
import {
  addProduct,
  deleteSellingProducts,
  getDiscountingProducts,
  getMostViewedProducts,
  getRecommendProduct,
  getSellinglist,
  getWatchedProducts,
  updateProductStatus,
} from './product_thunk';
import { getCategory } from '../categories/categoryThunk';

export const Products = createSlice({
  name: 'products',
  initialState: {
    categories: [],
    mostViewed: [],
    discounting: [],
    recommended: [],
    watchedProducts: [],
    sellingList: [],
    loading: false,
    error: '',
  },
  reducers: {
    setSellinglist: (state, action) => {
      state.sellingList = action.payload;
    },
  },
  extraReducers: (bulider) => {
    bulider
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(getMostViewedProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMostViewedProducts.fulfilled, (state, action) => {
        state.mostViewed = action.payload;
        state.loading = false;
      })
      .addCase(getMostViewedProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(getDiscountingProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDiscountingProducts.fulfilled, (state, action) => {
        state.discounting = action.payload;
        state.loading = false;
      })
      .addCase(getDiscountingProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(getRecommendProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRecommendProduct.fulfilled, (state, action) => {
        state.recommended = action.payload;
        state.loading = false;
      })
      .addCase(getRecommendProduct.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(getWatchedProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWatchedProducts.fulfilled, (state, action) => {
        state.watchedProducts = action.payload;
        state.loading = false;
      })
      .addCase(getWatchedProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(getSellinglist.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSellinglist.fulfilled, (state, action) => {
        state.sellingList = action.payload;
        state.loading = false;
      })
      .addCase(getSellinglist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProductStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductStatus.fulfilled, (state, action) => {
        state.sellingList = action.payload;
        state.loading = false;
      })
      .addCase(updateProductStatus.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(deleteSellingProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSellingProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.sellingList = action.payload;
      })
      .addCase(deleteSellingProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.sellingList = action.payload;
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});
export const { setSellinglist } = Products.actions;
export default Products.reducer;
