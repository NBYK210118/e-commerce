import { createSlice } from '@reduxjs/toolkit';
import {
  getDiscountingProducts,
  getMostViewedProducts,
  getRecommendProduct,
  getWatchedProducts,
} from './product_thunk';

export const Products = createSlice({
  name: 'products',
  initialState: {
    mostViewed: [],
    discounting: [],
    recommended: [],
    watchedProducts: [],
    sellingList: [],
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (bulider) => {
    bulider
      .addCase(getMostViewedProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMostViewedProducts.fulfilled, (state, action) => {
        state.mostViewed = action.payload;
        state.loading = false;
      })
      .addCase(getMostViewedProducts.rejected, (state, action) => {
        state.error = action.payload;
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
        state.error = action.payload;
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
        state.error = action.payload;
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
        state.error = action.payload;
        state.loading = false;
      });
  },
});
export const {} = Products.actions;
export default Products.reducer;
