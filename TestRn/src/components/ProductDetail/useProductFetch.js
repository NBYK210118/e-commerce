import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { findProduct } from '../../features/products/product_thunk';

export const useProductFetch = () => {
  const [heart, setHeart] = useState({});
  const { selectedProductId, currentProduct } = useSelector((state) => state.products);
  const { user, token } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(0);
  const [activeMenu, setActiveMenu] = useState({});
  const { width } = Dimensions.get('window');
  const handleHorizontalScroll = (event) => {
    // 현재 x 좌표 얻기
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    // x 좌표값을 너비로 나누고 반올림 -> 몇 번째 페이지인지에 대한 값 도출
    const currentPageIndex = Math.round(contentOffsetX / width);
    setCurrentPage(currentPageIndex);
  };

  const fetchDetail = useCallback(() => {
    if (selectedProductId) {
      console.log(selectedProductId);
      try {
        dispatch(findProduct({ product_id: selectedProductId }));
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
            case 500:
              navigation.navigate('Home');
          }
        }
      }
    }
  }, [selectedProductId]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  useEffect(() => {
    if (currentProduct) {
      if (token && user) {
        if (currentProduct.likedBy.length > 0) {
          const isLiked = currentProduct.likedBy.some((val) => val.userId === user.id);
          setHeart((prevHeart) => ({
            ...prevHeart,
            [currentProduct.id]: isLiked,
          }));
        } else
          setHeart((prevHeart) => ({
            ...prevHeart,
            [currentProduct.id]: false,
          }));
      }
    }
  }, [currentProduct]);

  const handleHeart = () => {
    if (token && user && currentProduct) {
      setHeart((prevState) => ({ ...prevState, [currentProduct.id]: !heart[currentProduct.id] }));
      const data = { [currentProduct.id]: !heart[currentProduct.id] };
      try {
        dispatch(updateProductLike({ token, likes: data }));
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
            case 401:
            case 500:
              navigation.navigate('Home');
          }
        }
      }
    } else {
      alert('로그인이 필요합니다');
      navigation.navigate('Login');
      return;
    }
  };

  return {
    currentProduct,
    currentPage,
    handleHeart,
    handleHorizontalScroll,
    heart,
  };
};
