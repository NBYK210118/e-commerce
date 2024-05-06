import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { findProduct } from '../features/products/product_thunk';
import ProductApi from '../services/product_api';
import { useSharedValue, withTiming } from 'react-native-reanimated';

export const useProductFetch = () => {
  const { selectedProductId, currentProduct, currentStars } = useSelector((state) => state.products);
  const { user, token } = useSelector((state) => state.userAuth);
  const [isUsers, setIsUsers] = useState(false);
  const [userReviewed, setUserReviewed] = useState(null);
  const [heart, setHeart] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [activeMenu, setActiveMenu] = useState(0);
  const borderWidths = [...Array(3)].map(() => useSharedValue(0));
  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');

  const handleHorizontalScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentPageIndex = Math.round(contentOffsetX / width);
    setCurrentPage(currentPageIndex);
  };

  const fetchDetail = useCallback(() => {
    if (selectedProductId) {
      try {
        dispatch(findProduct({ product_id: selectedProductId }));
        ProductApi.getAllReviewsByProduct(selectedProductId).then((response) => {
          setReviews(response.data);
        });
        if (token) {
          ProductApi.isUsersProduct(token, selectedProductId).then((response) => {
            setIsUsers(response.data);
          });
          ProductApi.checkUserAlreadyReviewed(token, selectedProductId).then((response) => {
            setUserReviewed(response.data);
          });
        }
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
  }, [selectedProductId, navigation, dispatch]);

  useFocusEffect(
    useCallback(() => {
      if (token) {
        ProductApi.userViewed(token, selectedProductId).then((response) => {
          console.log('유저 조회수 증가');
        });
      } else {
        ProductApi.guestViewed(selectedProductId).then((response) => {
          console.log('게스트에 의해 조회수 증가');
        });
      }
    }, [token, navigation])
  );

  useFocusEffect(fetchDetail);

  useEffect(() => {
    borderWidths[activeMenu].value = withTiming(3, { duration: 500 });

    navigation.setOptions({ headerShown: false });
  }, []);

  const handlePress = (index) => {
    setActiveMenu(index);
    borderWidths[index].value = withTiming(3, { duration: 500 });
  };

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

  const handlePostReview = (data) => {
    if (!token || !user) {
      alert('로그인이 필요한 기능입니다');
      navigation.navigate('Login');
    }
    ProductApi.updateReview(token, data).then((response) => {
      setReviews((prevState) => prevState.push(response.data));
      if (!userReviewed) {
        setUserReviewed(response.data);
      }
    });
  };

  const handleAddToBasket = () => {
    ProductApi.addProductMyBasket(token, selectedProductId, navigation).then((response) => {
      if (response.status === 401) {
        navigation.navigate('Login');
      } else if ((response.status === 200) | 201) {
        alert('장바구니에 추가되었습니다!');
        navigation.navigate('Product');
      }
    });
  };

  return {
    currentProduct,
    currentStars,
    currentPage,
    handleHeart,
    handleHorizontalScroll,
    heart,
    isUsers,
    handlePress,
    borderWidths,
    activeMenu,
    navigation,
    user,
    token,
    reviews,
    setReviews,
    userReviewed,
    setUserReviewed,
    selectedProductId,
    handlePostReview,
    handleAddToBasket,
  };
};
