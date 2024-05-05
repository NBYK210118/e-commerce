import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedProduct } from '../features/products/product_slice';
import { getRecommendProduct } from '../features/products/product_thunk';
import { useCallback, useEffect } from 'react';

export const useRecommendHooks = () => {
  const loading = useSelector((state) => state.products.loading);
  const user = useSelector((state) => state.userAuth.user);
  const recommended_products = useSelector((state) => state.products.recommended);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const opacity = useSharedValue(0.5);

  const handleMoveToProductDetail = (idx) => {
    dispatch(setSelectedProduct(idx));
    navigation.navigate('Product');
  };

  useEffect(() => {
    if (!loading) {
      opacity.value = withTiming(1, { duration: 500 });
    } else {
      opacity.value = withRepeat(withTiming(0.5, { duration: 500 }), -1, true);
    }
  }, [loading, opacity, navigation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useFocusEffect(
    useCallback(() => {
      if (recommended_products.length < 1) {
        dispatch(getRecommendProduct());
      }
    }, [dispatch, navigation])
  );

  return {
    loading,
    user,
    recommended_products,
    navigation,
    handleMoveToProductDetail,
    animatedStyle,
  };
};
