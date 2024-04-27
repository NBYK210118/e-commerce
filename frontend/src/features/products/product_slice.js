import { createSlice } from '@reduxjs/toolkit';
import {
  addProduct,
  deleteSellingProducts,
  findProduct,
  findProductByCategory,
  findProductByKeyword,
  getCategory,
  getDiscountingProducts,
  getMostViewedProducts,
  getRecommendProduct,
  getSellinglist,
  getWatchedProducts,
  updateProduct,
  updateProductLike,
  updateProductStatus,
} from './product_thunk';

export const Products = createSlice({
  name: 'products',
  initialState: {
    currentProduct: null,
    categories: [],
    mostViewed: [],
    discounting: [],
    recommended: [],
    watchedProducts: [],
    sellingList: [],
    loading: false,
    selectedProductId: null,
    error: '',
  },
  reducers: {
    setSellinglist: (state, action) => {
      state.sellingList = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProductId = action.payload;
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
        state.error = action.payload;
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
        state.error = action.payload;
      })
      .addCase(updateProductStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductStatus.fulfilled, (state, action) => {
        state.sellingList = action.payload;
        state.loading = false;
      })
      .addCase(updateProductStatus.rejected, (state, action) => {
        state.error = action.payload;
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
        state.error = action.payload;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.sellingList = action.payload;
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.sellingList = action.payload;
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(findProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(findProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(findProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(findProductByKeyword.pending, (state) => {
        state.loading = true;
      })
      .addCase(findProductByKeyword.fulfilled, (state, action) => {
        state.sellingList = action.payload;
        state.loading = false;
      })
      .addCase(findProductByKeyword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(findProductByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(findProductByCategory.fulfilled, (state, action) => {
        state.sellingList = action.payload;
        state.loading = false;
      })
      .addCase(findProductByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProductLike.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductLike.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(updateProductLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setSellinglist, setSelectedProduct } = Products.actions;
export default Products.reducer;
