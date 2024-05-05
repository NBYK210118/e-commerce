import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';
import { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { getWatchedProducts } from '../features/products/product_thunk';

export const useWatchedHooks = () => {
  const token = useSelector((val) => val.userAuth.token);
  const products = useSelector((val) => val.products.watchedProducts);
  const loading = useSelector((val) => val.products.loading);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    if (!loading) {
      opacity.value = withTiming(0, { duration: 1000 });
    } else {
      opacity.value = withRepeat(withTiming(0.6, { duration: 1000 }), -1, true);
    }
  }, [loading, opacity, navigation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useFocusEffect(
    useCallback(() => {
      if (token) {
        dispatch(getWatchedProducts({ token, navigation }));
      }
    }, [token, navigation, dispatch])
  );

  return {
    animatedStyle,
    loading,
    products,
  };
};
