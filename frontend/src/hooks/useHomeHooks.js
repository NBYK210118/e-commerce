import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';

export const useHomeHooks = () => {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState('');
  const borderWidths = [...Array(7)].map(() => useSharedValue(0));
  const currentLocation = useSelector((state) => state.userAuth.currentLocation);
  const userInfo_loading = useSelector((state) => state.userAuth.loading);
  const token = useSelector((val) => val.userAuth.token);
  const navigation = useNavigation();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const menuBarStyle = useAnimatedStyle(() => {
    const translateY = interpolate(scrollY.value, [30, 31], [0, 10], Extrapolation.CLAMP);

    return {
      transform: [{ translateY }],
      position: scrollY.value > 30 ? 'absolute' : 'relative',
      top: scrollY.value > 30 ? scrollY.value - 14 : 'auto',
      left: 0,
      right: 0,
      zIndex: 1,
      backgroundColor: 'white',
    };
  });

  const handleLogin = () => {
    if (!token) {
      navigation.navigate('Login');
    } else {
      navigation.navigate('MyPage');
    }
  };

  return {
    token,
    active,
    setActive,
    borderWidths,
    scrollHandler,
    menuBarStyle,
    handleLogin,
    userInfo_loading,
    currentLocation,
    setSelected,
  };
};
