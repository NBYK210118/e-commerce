import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getMostViewedProducts } from '../../features/products/product_thunk';
import { useCallback, useEffect } from 'react';
import { gray1, primary_gray } from '../../styles/common/colors';
import { FontAwesome } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat } from 'react-native-reanimated';
import { setSelectedProduct } from '../../features/products/product_slice';

export const MostViewedProducts = () => {
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

  return (
    <View style={mv_style.content}>
      <Text style={mv_style.header}>실시간 조회수 상위</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={16}>
        {loading
          ? [...Array(5)].map((_, idx) => (
              <TouchableOpacity key={idx} style={mv_style.box}>
                <Animated.Image style={[mv_style.img, { backgroundColor: primary_gray }, animatedStyle]} />
              </TouchableOpacity>
            ))
          : mostviewed_products.map((val, idx) => (
              <TouchableOpacity key={idx} style={mv_style.box} onPress={() => handleMoveToProductDetail(val.id)}>
                <Image source={{ uri: val.images[0]?.imgUrl }} style={mv_style.img} />
                <View
                  style={{ overflow: 'hidden', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                >
                  <Text numberOfLines={1} ellipsizeMode="tail" style={mv_style.product_name}>
                    {val.name}
                  </Text>
                  <Text style={{ color: 'gray', fontSize: 9 }}>
                    <FontAwesome name="eye" size={12} color="black" />
                    {val.viewed_count}
                  </Text>
                </View>
                <Text numberOfLines={1} ellipsizeMode="tail" style={mv_style.price}>
                  {val.price.toLocaleString('ko-kr')}원
                </Text>
              </TouchableOpacity>
            ))}
      </ScrollView>
    </View>
  );
};

const mv_style = StyleSheet.create({
  content: {
    marginTop: 20,
    marginHorizontal: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  box: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 5,
  },
  img: { width: 90, height: 100 },
  product_name: { fontWeight: 'bold', textAlign: 'center', marginRight: 2 },
  price: { textAlign: 'center' },
});
