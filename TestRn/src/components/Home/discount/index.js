import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getDiscountingProducts } from '../../../features/products/product_thunk';
import { discount_style } from '../../../styles/home_styles/discount_style';

export const DiscountProducts = () => {
  const loading = useSelector((val) => val.products.loading);
  const discounting_products = useSelector((val) => val.products.discounting) || [];
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (discounting_products.length < 1) {
      dispatch(getDiscountingProducts(navigation));
    }
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {}, 2000);
  }, [discounting_products]);

  return (
    <View style={discount_style.container}>
      <Text style={discount_style.header}>지금 특별 할인!</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={16}>
        {loading ? (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginRight: 5,
            }}
          >
            <View style={{ width: 100, height: 100, backgroundColor: 'gray' }}></View>
          </View>
        ) : (
          discounting_products.map((val, idx) => (
            <View key={idx} style={discount_style.box}>
              <Image source={{ uri: val.images[0].imgUrl }} style={discount_style.img} />
              <Text numberOfLines={2} style={discount_style.name}>
                {val.name}
              </Text>

              <View style={discount_style.price_zone}>
                {val.isDiscounting && (
                  <Text style={discount_style.original_price}>{val.price.toLocaleString('ko-kr')}원</Text>
                )}
                <Text style={discount_style.discount_price}>
                  {val.isDiscounting ? val.discountPrice.toLocaleString('ko-kr') : val.price.toLocaleString('ko-kr')}원
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};
