import { useNavigation } from '@react-navigation/native';
import { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedProduct } from '../features/products/product_slice';
import { useEffect } from 'react';
import { getMostViewedProducts } from '../features/products/product_thunk';

export const useMostViewedHooks = () => {
  const mostviewed_products = useSelector((val) => val.products.mostViewed);
  const loading = useSelector((val) => val.products.loading);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const opacity = useSharedValue(0.5);

  const handleMoveToProductDetail = (idx) => {
    dispatch(setSelectedProduct(idx));
    navigation.navigate('Product');
  };

  useEffect(() => {
    if (!loading) {
      opacity.value = withTiming(0, { duration: 1000 });
    } else {
      opacity.value = withRepeat(withTiming(0.3, { duration: 1000 }), -1, true);
    }
  }, [loading, opacity, navigation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    if (mostviewed_products.length < 1) {
      dispatch(getMostViewedProducts(navigation));
    }
  }, [dispatch, navigation]);

  return {
    mostviewed_products,
    loading,
    opacity,
    handleMoveToProductDetail,
    animatedStyle,
  };
};
