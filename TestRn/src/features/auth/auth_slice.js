import { createSlice } from '@reduxjs/toolkit';
import { getUserLocation, signIn, verifyToken } from './auth_thunk';
import { getCategory } from '../categories/categoryThunk';

export const UserAuth = createSlice({
  name: 'userAuth',
  initialState: {
    address: '',
    loading: false,
    error: '',
    categories: [],
    user: null,
    token: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserLocation.pending, (state) => {
        console.log('getlocation loading');
        state.loading = true;
        console.log(state.loading);
      })
      .addCase(getUserLocation.fulfilled, (state, action) => {
        console.log('i got location');
        state.address = `${action.payload.region} ${action.payload.city} ${action.payload.name}`;
        state.loading = false;
        console.log(state.loading);
      })
      .addCase(getUserLocation.rejected, (state, action) => {
        console.log('rejected');
        state.error = action.payload;
        state.loading = false;
        console.log(state.loading);
      })
      .addCase(getCategory.pending, (state) => {
        console.log('getCategory loading');
        state.loading = true;
        console.log(state.loading);
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        console.log('i got category');
        state.categories = action.payload;
        state.loading = false;
        console.log(state.loading);
      })
      .addCase(getCategory.rejected, (state, action) => {
        console.log('category rejected');
        state.error = action.payload;
        state.loading = false;
        console.log(state.loading);
      })
      .addCase(signIn.pending, (state) => {
        console.log('Waiting Response');
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        console.log('i got JWT');
        state.token = action.payload.access_token;
      })
      .addCase(signIn.rejected, (state, action) => {
        console.log('reject signin');
        state.error = action.payload.access_token;
        state.loading = false;
      })
      .addCase(verifyToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const {} = UserAuth.actions;

export default UserAuth.reducer;
