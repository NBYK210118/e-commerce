import { configureStore } from '@reduxjs/toolkit';
import userAuth from '../features/auth/auth_slice';
import products from '../features/products/product_slice';

export const store = configureStore({
  reducer: {
    userAuth,
    products,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      serializableCheck: {
        ignoredActions: [
          'userAuth/getUserLocation/rejected',
          'userAuth/signIn/rejected',
          'userAuth/updateProfile/rejected',
          'userAuth/signUp/rejected',
          'userAuth/getUserLocation/rejected',
          'userAuth/getUserLocation/rejected',
          'userAuth/getUserLocation/rejected',
          'products/getDiscountingProducts/rejected',
          'products/getRecommendProduct/rejected',
          'products/getWatchedProducts/rejected',
          'products/updateProductStatus/rejected',
          'products/deleteSellingProducts/rejected',
          'products/addProduct/rejected',
          'products/updateProduct/rejected',
          'products/findProductByKeyword/rejected',
          'products/findProductByCategory/rejected',
        ],
      },
    }),
});
