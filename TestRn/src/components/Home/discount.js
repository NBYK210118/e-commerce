import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getDiscountingProducts } from '../../features/products/product_thunk';
import { primary_gray } from '../../styles/common/colors';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat } from 'react-native-reanimated';

export const DiscountProducts = () => {
  const loading = useSelector((val) => val.products.loading);
  // const loading = true;
  const discounting_products = useSelector((val) => val.products.discounting);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const opacity = useSharedValue(0.5);

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

  useFocusEffect(
    useCallback(() => {
      if (discounting_products.length < 1) {
        dispatch(getDiscountingProducts(navigation));
      }
    }, [dispatch, navigation])
  );

  return (
    <View style={discount_style.container}>
      <Text style={discount_style.header}>지금 특별 할인!</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={16}>
        {loading
          ? [...Array(5)].map((_, idx) => (
              <TouchableOpacity key={idx} style={discount_style.box}>
                <Animated.Image style={[discount_style.img, { backgroundColor: primary_gray }, animatedStyle]} />
                <Animated.Text
                  numberOfLines={2}
                  style={[
                    discount_style.name,
                    { backgroundColor: primary_gray, width: 120, height: 10 },
                    animatedStyle,
                  ]}
                />
                <Animated.View
                  style={[
                    discount_style.price_zone,
                    { backgroundColor: primary_gray, width: 120, height: 10 },
                    animatedStyle,
                  ]}
                >
                  <Text style={discount_style.discount_price} />
                </Animated.View>
              </TouchableOpacity>
            ))
          : discounting_products.map((val, idx) => (
              <TouchableOpacity key={idx} style={discount_style.box}>
                <Image source={{ uri: val.images[0].imgUrl }} style={discount_style.img} />
                <Text numberOfLines={1} ellipsizeMode="tail" style={discount_style.name}>
                  {val.name}
                </Text>

                <View style={discount_style.price_zone}>
                  {val.isDiscounting && (
                    <Text numberOfLines={1} ellipsizeMode="tail" style={discount_style.original_price}>
                      {val.price.toLocaleString('ko-kr')}원
                    </Text>
                  )}
                  <Text numberOfLines={1} ellipsizeMode="tail" style={discount_style.discount_price}>
                    {val.isDiscounting ? val.discountPrice.toLocaleString('ko-kr') : val.price.toLocaleString('ko-kr')}
                    원
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
      </ScrollView>
    </View>
  );
};

const discount_style = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  box: {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    marginRight: 5,
  },
  img: { width: 120, height: 100 },
  name: { fontWeight: 'bold', textAlign: 'center' },
  price_zone: { display: 'flex', flexDirection: 'row' },
  original_price: { textDecorationLine: 'line-through', color: 'red', fontSize: 10 },
  discount_price: { textAlign: 'center', fontSize: 12, marginLeft: 2 },
});
