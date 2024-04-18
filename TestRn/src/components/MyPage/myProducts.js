import { Animated, Dimensions, PanResponder, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import ReAnimated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';
import { primary_gray } from '../../styles/common/colors';
import {
  deleteSellingProducts,
  findProductByCategory,
  findProductByKeyword,
  getSellinglist,
} from '../../features/products/product_thunk';
import ProductButton from './buttons/product_button';
import ProductItem from './ProductItem';
import SearchBar from './SearchBar';
import ProductApi from '../../services/product_api';
import { setSellinglist } from '../../features/products/product_slice';
import { HorizontalCategory } from './HorizontalCategory';
import { setOptionsVisible } from '../../features/auth/auth_slice';

export const MyProducts = () => {
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

  const LoadingSkeleton = ({ loadingStyle }) => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginLeft: 20, paddingTop: 10, paddingBottom: 30 }}>
        {[...Array(7)].map((_, idx) => (
          <ReAnimated.View key={idx} style={[{ flexDirection: 'row', marginBottom: 10 }]}>
            <ReAnimated.Image
              style={[{ width: 70, height: 70, marginHorizontal: 10, backgroundColor: primary_gray }, loadingStyle]}
            />
            <ReAnimated.View style={{ flexDirection: 'column', justifyContent: 'center' }}>
              <ReAnimated.Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[loadingStyle, { width: 180, height: 25, marginBottom: 10, backgroundColor: primary_gray }]}
              />
              <ReAnimated.Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[loadingStyle, { width: 180, height: 25, backgroundColor: primary_gray }]}
              />
            </ReAnimated.View>
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
              <ReAnimated.View
                style={[
                  { width: 50, height: 20, marginLeft: 5, marginBottom: 5, backgroundColor: primary_gray },
                  loadingStyle,
                ]}
              />
              <ReAnimated.View
                style={[{ width: 50, height: 20, marginLeft: 5, backgroundColor: primary_gray }, loadingStyle]}
              />
            </View>
          </ReAnimated.View>
        ))}
      </ScrollView>
    );
  };

  const NoProducts = () => {
    return (
      <View
        style={{
          position: 'absolute',
          backgroundColor: '#f5f5dc',
        }}
      >
        <Text>등록하신 상품이 없습니다!</Text>
      </View>
    );
  };

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
    navigation.navigate('Product', { product_id });
  };

  return (
    <ReAnimated.View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
      <SearchBar onPress={searchByKeyword} />
      <HorizontalCategory categories={categories} categoryStatus={categoryStatus} onPress={handleCategoryChecked} />
      {loading ? (
        <LoadingSkeleton loadingStyle={animatedStyle} />
      ) : (
        <ReAnimated.FlatList
          data={products || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <ProductItem
              item={item}
              index={index}
              scrollY={scrollY}
              handleProductStatus={handleProductStatus}
              handleChecked={handleChecked}
              checkStatus={checkStatus}
              handleUpdateBtn={handleUpdateBtn}
            />
          )}
          onScroll={scrollHandler}
          scrollEventThrottle={18}
          ListEmptyComponent={<NoProducts />}
          style={animatedStyle2}
        />
      )}
      <ProductButton navigation={navigation} deleteProducts={deleteProducts} />
    </ReAnimated.View>
  );
};
