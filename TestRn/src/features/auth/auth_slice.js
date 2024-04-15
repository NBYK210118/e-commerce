import { createSlice } from '@reduxjs/toolkit';
import { getUserLocation, logout, signIn, updateProfile, verifyToken } from './auth_thunk';

export const UserAuth = createSlice({
  name: 'userAuth',
  initialState: {
    address: '',
    loading: false,
    error: '',
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
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
        state.user = action.payload.user.user;
        state.accessToGallery = action.payload.user.user.allowCurrentLocation;
        state.loading = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.payload.access_token;
        state.loading = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.token = false;
        state.accessToGallery = false;
        state.address = '';
        state.error = '';
        state.user = '';
      });
  },
});

export const { setAccessToGallery } = UserAuth.actions;

export default UserAuth.reducer;
