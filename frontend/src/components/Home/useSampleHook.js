import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';

export const useSampleHook = () => {
  //상단 메뉴 중 활성화된 메뉴 State
  const [active, setActive] = useState(0);
  //상단 메뉴 선택 상태 관리 State
  const [headStatus, setHeadStatus] = useState({});
  const borderWidths = [...Array(7)].map(() => useSharedValue(0));
  const currentLocation = useSelector((val) => val.userAuth.address);
  const userInfo_loading = useSelector((val) => val.userAuth.loading);
  const token = useSelector((val) => val.userAuth.token);
  const navigation = useNavigation();
  const scrollY = useSharedValue(0);

  useEffect(() => {
    if (headStatus.length > 0) {
      setActive(active);
      headStatus[active].value = withTiming(3, { duration: 300 });
      setHeadStatus(
        [...Array(headStatus.length)].reduce((acc, _, idx) => {
          acc[idx] = false;
          return acc;
        }, {})
      );
    }
  }, []);

  // 스크롤 핸들러 정의
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // 스크롤에 따른 메뉴바 스타일 조정
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
      navigation.navigate('Profile');
    }
  };

  return {
    token,
    active,
    setActive,
    setHeadStatus,
    scrollHandler,
    menuBarStyle,
    handleLogin,
    borderWidths,
    userInfo_loading,
    currentLocation,
  };
};
