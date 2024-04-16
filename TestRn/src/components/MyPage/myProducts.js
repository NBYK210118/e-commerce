import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';
import { primary_gray } from '../../styles/common/colors';
import { deleteSellingProducts, getSellinglist, updateProductStatus } from '../../features/products/product_thunk';
import ProductButton from './buttons/product_button';
import ProductItem from './ProductItem';
import SearchBar from './SearchBar';
import ProductApi from '../../services/product_api';
import { setSellinglist } from '../../features/products/product_slice';
import DataService from '../../services/user_api';

export const MyProducts = () => {
  const token = useSelector((val) => val.userAuth.token);
  const loading = useSelector((val) => val.products.loading);
  const products = useSelector((val) => val.products.sellingList) || [];
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [currentLimit, setCurrentLimit] = useState(10);
  const [manageStatus, setManageStatus] = useState({});
  const [checkStatus, setCheckStatus] = useState({});
  const scrollY = useSharedValue(0);
  const opacity = useSharedValue(0.5);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
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
    }, [])
  );

  useEffect(() => {
    console.log('asdfasdf: ', checkStatus);
  }, [checkStatus]);

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
            alert('잘못된 요청입니다');
          case 401:
            alert('로그인이 필요합니다');
          case 500:
            alert('서버 에러!');
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
          console.log('요청 에러', error);
        case 401:
          alert('권한 없음');
          navigation.navigate('Login');
        case 500:
          alert('서버 에러');
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

  const handleChecked = (product_id) => {
    setCheckStatus({
      ...checkStatus,
      [product_id]: !checkStatus[product_id],
    });
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
          <Animated.View key={idx} style={[styles.productItem, { flexDirection: 'row', marginBottom: 10 }]}>
            <Animated.Image
              style={[{ width: 70, height: 70, marginHorizontal: 10, backgroundColor: primary_gray }, loadingStyle]}
            />
            <Animated.View style={{ flexDirection: 'column', justifyContent: 'center' }}>
              <Animated.Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.productName,
                  loadingStyle,
                  { width: 180, height: 25, marginBottom: 10, backgroundColor: primary_gray },
                ]}
              />
              <Animated.Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[styles.productName, loadingStyle, { width: 180, height: 25, backgroundColor: primary_gray }]}
              />
            </Animated.View>
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
              <Animated.View
                style={[
                  { width: 50, height: 20, marginLeft: 5, marginBottom: 5, backgroundColor: primary_gray },
                  loadingStyle,
                ]}
              />
              <Animated.View
                style={[{ width: 50, height: 20, marginLeft: 5, backgroundColor: primary_gray }, loadingStyle]}
              />
            </View>
          </Animated.View>
        ))}
      </ScrollView>
    );
  };

  const NoProducts = () => {
    return (
      <View style={{ backgroundColor: primary_gray }}>
        <Text>판매 중이신 상품이 없습니다!</Text>
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
            alert('죄송합니다 다시 시도해주세요');
          case 401:
            alert('죄송합니다 다시 시도해주세요');
          case 500:
            alert('죄송합니다 다시 시도해주세요');
        }
      }
    } else {
      alert('취소하시려는 상품을 선택해주세요');
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar />
      {loading ? (
        <LoadingSkeleton loadingStyle={animatedStyle} />
      ) : (
        <Animated.FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <ProductItem
              item={item}
              index={index}
              scrollY={scrollY}
              handleProductStatus={handleProductStatus}
              handleChecked={handleChecked}
              checkStatus={checkStatus}
            />
          )}
          onScroll={scrollHandler}
          scrollEventThrottle={18}
          ListEmptyComponent={<NoProducts />}
        />
      )}
      <ProductButton navigation={navigation} deleteProducts={deleteProducts} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'column' },
  header: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
  },
});
