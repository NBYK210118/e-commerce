import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';
import { useEffect } from 'react';
import { setAccessToGallery } from '../features/auth/auth_slice';
import { getUserLocation, logout } from '../features/auth/auth_thunk';

export const useMainState = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const { token, currentLocation } = useSelector((state) => state.userAuth);

  useEffect(() => {
    if (currentLocation === '' || currentLocation === undefined || currentLocation === null) {
      dispatch(getUserLocation());
    }
  }, []);

  const handleLogOut = async () => {
    try {
      dispatch(logout());
      Alert.alert('로그아웃', '성공적으로 로그아웃되었습니다!');
    } catch (error) {
      Alert.alert('로그아웃', '죄송합니다. 다시 시도해주세요');
    }
  };

  if (token && status === null) {
    requestPermission();
    dispatch(setAccessToGallery(status));
  }

  return {
    dispatch,
    navigation,
    token,
    currentLocation,
    handleLogOut,
  };
};
