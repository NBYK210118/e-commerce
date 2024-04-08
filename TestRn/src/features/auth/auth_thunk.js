import { createAsyncThunk } from '@reduxjs/toolkit';
import * as Location from 'expo-location';
import DataService from '../../services/user_api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signIn = createAsyncThunk('shopping/login', async (data, { rejectWithValue }) => {
  try {
    const response = await DataService.signIn(data);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log('Error:', error);
    return rejectWithValue(error.response?.data || 'An error occurred');
  }
});

export const verifyToken = createAsyncThunk('shopping/verify', async (data, { rejectWithValue }) => {
  try {
    const found = AsyncStorage.getItem('user');
    if (!found) {
      const { token, navigation } = data;
      const response = await DataService.verifyToken(token, navigation);
      AsyncStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    }
    return found;
  } catch (error) {
    console.log('Error:', error);
    return rejectWithValue(error.response?.data || 'An error occurred');
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
    return rejectWithValue(error.message);
  }
});
