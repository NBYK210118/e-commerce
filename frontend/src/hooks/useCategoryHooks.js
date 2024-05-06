import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../features/products/product_thunk';
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
export const useCategoryHooks = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const category_datas = useSelector((val) => val.products.categories);
  const loading = useSelector((val) => val.products.loading);
  const [pages, setPages] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    dispatch(getCategory({ navigate: navigation }));
  }, []);

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
  const handleScroll = (event) => {
    // 현재 x 좌표 얻기
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    // x 좌표값을 너비로 나누고 반올림 -> 몇 번째 페이지인지에 대한 값 도출
    const currentPageIndex = Math.round(contentOffsetX / width);
    setCurrentPage(currentPageIndex);
  };

  useEffect(() => {
    if (category_datas.length > 0) {
      const itemsPerPage = Math.round(category_datas.length / 2);
      const newPages = [];
      for (let i = 0; i < category_datas.length; i += itemsPerPage) {
        newPages.push(category_datas.slice(i, i + itemsPerPage));
      }
      setPages(newPages);
    }
  }, [category_datas]);

  const handlePress = (category) => {
    navigation.navigate('ProductList', { categoryName: category });
  };

  return {
    handlePress,
    handleScroll,
    animatedStyle,
    pages,
    loading,
    category_datas,
    currentPage,
  };
};
