import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { getDiscountingProducts } from '../features/products/product_thunk';
import { setSelectedProduct } from '../features/products/product_slice';
import { useCallback, useEffect } from 'react';

export const useDiscountHooks = () => {
  const loading = useSelector((val) => val.products.loading);
  const discounting_products = useSelector((val) => val.products.discounting);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    if (!loading) {
      opacity.value = withTiming(1, { duration: 1000 });
    } else {
      opacity.value = withRepeat(withTiming(0.3, { duration: 1000 }), -1, true);
    }
  }, [loading, opacity, navigation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useFocusEffect(
    useCallback(() => {
      if (discounting_products.length < 1) {
        dispatch(getDiscountingProducts(navigation));
      }
    }, [dispatch, navigation])
  );

  const handleMoveToDetail = (product_id) => {
    navigation.navigate('Product');
    dispatch(setSelectedProduct(product_id));
  };

  return {
    loading,
    discounting_products,
    handleMoveToDetail,
    animatedStyle,
  };
};
