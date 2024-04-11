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
    accessToGallery: false,
  },
  reducers: {
    setAccessToGallery: (state, action) => {
      state.accessToGallery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserLocation.fulfilled, (state, action) => {
        state.address = `${action.payload.region} ${action.payload.city} ${action.payload.name}`;
        state.loading = false;
      })
      .addCase(getUserLocation.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
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
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
        state.user = action.payload.user.user;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.payload.access_token;
        state.loading = false;
      });
  },
});

export const { setAccessToGallery } = UserAuth.actions;

export default UserAuth.reducer;
