import { createAsyncThunk } from '@reduxjs/toolkit';
import * as Location from 'expo-location';
import DataService from '../../services/user_api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signIn = createAsyncThunk('shopping/login', async (data, { rejectWithValue }) => {
  try {
    const { navigation } = data;
    const found1 = await AsyncStorage.getItem('token');
    const found2 = await AsyncStorage.getItem('user');

    if (!found1 || !found2) {
      const response1 = await DataService.signIn(data);
      if (response1.data) {
        const token = response1.data;
        const response2 = await DataService.verifyToken(token, navigation);
        const data = { access_token: response1.data, user: response2.data };
        return data;
      }
    } else {
      alert('존재하지 않는 계정이거나 잘못된 비밀번호입니다');
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

export const logout = createAsyncThunk('shopping/logout', async (_, rejectWithValue) => {
  try {
    await AsyncStorage.clear();
    return {};
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

export const getUserLocation = createAsyncThunk('shopping/getUserLocation', async (_, { rejectWithValue }) => {
  try {
    // 현재 위치정보 접근권한 설정 요청
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }
    // 현재 위치 정보
    const location = await Location.getCurrentPositionAsync({});

    const reversGeocode = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    if (reversGeocode.length > 0) {
      const addr = reversGeocode[0];

      return addr;
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

export const verifyToken = createAsyncThunk(
  'shopping/verifyToken',
  async ({ token, navigation }, { rejectWithValue }) => {
    try {
      const response = await DataService.verifyToken(token, navigation);
      if (response.data) {
        return response.data;
      } else {
        return 'Fail';
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

export const updateProfile = createAsyncThunk(
  'shopping/updateProfile',
  async ({ token, data, navigation }, { rejectWithValue }) => {
    try {
      const response = await DataService.updateProfile(token, data, navigation);
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

export const signUp = createAsyncThunk('shopping/signUp', async ({ data, navigation }, { rejectWithValue }) => {
  try {
    const response = await DataService.signUp(data);
    switch (response.status) {
      case 200:
        alert(`회원가입을 환영합니다!`);
        return response.data;
      case 500:
        alert('서버 에러');
      case 400:
        alert('잘못된 요청입니다');
      case 409:
        console.log('signup status: ', response.status);
      default:
        console.log('signup status: ', response.status);
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
