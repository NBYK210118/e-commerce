import { configureStore } from '@reduxjs/toolkit';
import userAuth from '../features/auth/auth_slice';
import products from '../features/products/product_slice';

export const store = configureStore({
  reducer: {
    userAuth,
    products,
  },
});
