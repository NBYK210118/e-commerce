import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import ProductApi from '../services/product_api';
import { deleteSellingProducts, findProductByKeyword, getSellinglist } from '../features/products/product_thunk';
import { setSellinglist } from '../features/products/product_slice';

export const useMyProductState = () => {
  const token = useSelector((state) => state.userAuth.token);
  const loading = useSelector((state) => state.products.loading);
  const products = useSelector((state) => state.products.sellingList) || [];
  const categories = useSelector((state) => state.products.categories) || [];
  const optionsVisible = useSelector((state) => state.userAuth.optionsVisible);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [currentLimit, setCurrentLimit] = useState(10);
  const [manageStatus, setManageStatus] = useState({});
  const [checkStatus, setCheckStatus] = useState({});
  const [categoryStatus, setCategoryStatus] = useState({});
  const scrollY = useSharedValue(0);
  const opacity = useSharedValue(0.5);
  const entire_opacity = useSharedValue(0.5);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });
  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      opacity: entire_opacity.value,
    };
  });

  useFocusEffect(
    useCallback(() => {
      setCheckStatus(
        products.reduce((acc, val) => {
          acc[val.id] = false;
          return acc;
        }, {})
      );
      setCategoryStatus(
        categories.reduce((acc, val) => {
          acc[val] = false;
          return acc;
        }, {})
      );
    }, [])
  );

  useEffect(() => {
    if (Object.keys(manageStatus).length > 0) {
      try {
        ProductApi.updateProductStatus(token, (data = JSON.stringify(manageStatus))).then((response) => {
          if (response.data) {
            dispatch(setSellinglist(response.data.products));
          }
        });
      } catch (error) {
        switch (error.response.status) {
          case 400:
            navigation.navigate('My Page');
          case 401:
            navigation.navigate('My Page');
          case 500:
            navigation.navigate('My Page');
        }
      }
    }
  }, [manageStatus]);

  useEffect(() => {
    try {
      dispatch(getSellinglist({ token, limit: currentLimit }));
    } catch (error) {
      switch (error.response.status) {
        case 400:
          navigation.navigate('My Page');
        case 401:
          navigation.navigate('Login');
        case 500:
          navigation.navigate('My Page');
      }
    }
    if (token && products.length > 0) {
      setManageStatus(
        products.reduce((acc, val) => {
          acc[val.id] = val.status === '판매중' ? true : false;
          return acc;
        }, {})
      );
    }
  }, [dispatch, navigation]);

  useFocusEffect(
    useCallback(() => {
      if (!token) {
        alert('로그인이 필요합니다');
        navigation.navigate('Login');
      }
    }, [token, navigation])
  );

  useEffect(() => {
    if (!loading) {
      opacity.value = withTiming(0, { duration: 1000 });
    } else {
      opacity.value = withRepeat(withTiming(0.28, { duration: 1000 }), -1, true);
    }
  }, [loading, opacity, navigation]);

  useEffect(() => {
    if (optionsVisible) {
      entire_opacity.value = withTiming(0.4, { duration: 500 });
    } else {
      entire_opacity.value = withTiming(1, { duration: 500 });
    }
  }, [optionsVisible]);

  const handleChecked = (product_id) => {
    setCheckStatus({
      ...checkStatus,
      [product_id]: !checkStatus[product_id],
    });
  };

  const handleCategoryChecked = (category) => {
    if (category) {
      setCategoryStatus((prevState) => {
        let newState = { ...prevState };
        newState[category] = !categoryStatus[category];

        Object.keys(prevState).forEach((key) => {
          if (key !== category) newState[key] = false;
        });
        const allUnChecked = Object.keys(newState).every((key) => !newState[key]);

        try {
          if (allUnChecked) {
            dispatch(getSellinglist({ token, limit: currentLimit }));
          } else {
            dispatch(findProductByCategory({ token, data: category }));
          }
        } catch (error) {
          if (error.response !== undefined) {
            switch (error.response.status) {
              case 401:
                navigation.navigate('Login');
              case 400:
                navigation.navigate('My Page');
              case 500:
                navigation.navigate('My Page');
            }
          }
        }
        return newState;
      });
    }
  };

  const handleProductStatus = (product_id) => {
    setManageStatus({
      ...manageStatus,
      [product_id]: !manageStatus[product_id],
    });
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const deleteProducts = () => {
    const found = Object.values(checkStatus).some((val) => val === true);
    if (found) {
      try {
        dispatch(deleteSellingProducts({ token, data: checkStatus }));
      } catch (error) {
        switch (error.response.status) {
          case 400:
            navigation.navigate('My Page');
          case 401:
            navigation.navigate('My Page');
          case 500:
            navigation.navigate('My Page');
        }
      }
    } else {
      alert('취소하시려는 상품을 선택해주세요');
    }
  };

  const searchByKeyword = (keyword, setKeyword) => {
    try {
      dispatch(findProductByKeyword({ token, data: keyword }));
    } catch (error) {
      switch (error.response.status) {
        case 400:
          navigation.navigate('My Page');
        case 401:
          navigation.navigate('My Page');
        case 500:
          navigation.navigate('My Page');
      }
    } finally {
      setKeyword('');
    }
  };

  const handleUpdateBtn = (product_id) => {
    navigation.navigate('Manage', { product_id });
  };

  return {
    searchByKeyword,
    categories,
    loading,
    categoryStatus,
    animatedStyle,
    animatedStyle2,
    products,
    checkStatus,
    scrollY,
    navigation,
    handleChecked,
    handleCategoryChecked,
    handleProductStatus,
    scrollHandler,
    deleteProducts,
    searchByKeyword,
    handleUpdateBtn,
  };
};
