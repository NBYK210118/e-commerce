import { createSlice } from '@reduxjs/toolkit';
import { getDiscountingProducts, getMostViewedProducts } from './product_thunk';

export const Products = createSlice({
  name: 'products',
  initialState: {
    mostViewed: [],
    discounting: [],
    recommended: [],
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
      });
  },
});
export const {} = Products.actions;
export default Products.reducer;
