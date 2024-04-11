import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { primary_gray } from '../../../styles/common/colors';
import { getWatchedProducts } from '../../../features/products/product_thunk';
import Animated from 'react-native-reanimated';

export const WatchedProducts = () => {
  const token = useSelector((val) => val.userAuth.token);
  const products = useSelector((val) => val.products.watchedProducts);
  const loading = useSelector((val) => val.products.loading);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      if (token) {
        dispatch(getWatchedProducts({ token, navigation }));
      }
    }, [token, navigation, dispatch])
  );

  const SkeletonComp = () => {
    return (
      <Animated.View style={wp_style.boxes}>
        <TouchableOpacity style={[wp_style.box]}>
          <View>
            <Image style={[wp_style.img, { borderRadius: 5, backgroundColor: 'gray' }]} />
            <Text style={{ borderRadius: 5, backgroundColor: 'gray' }}></Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[wp_style.box]}>
          <View>
            <Image style={[wp_style.img, { borderRadius: 5, backgroundColor: 'gray' }]} />
            <Text style={{ borderRadius: 5, backgroundColor: 'gray' }}></Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[wp_style.box]}>
          <View>
            <Image style={[wp_style.img, { borderRadius: 5, backgroundColor: 'gray' }]} />
            <Text style={{ borderRadius: 5, backgroundColor: 'gray' }}></Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[wp_style.box]}>
          <View>
            <Image style={[wp_style.img, { borderRadius: 5, backgroundColor: 'gray' }]} />
            <Text style={{ borderRadius: 5, backgroundColor: 'gray' }}></Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[wp_style.box]}>
          <View>
            <Image style={[wp_style.img, { borderRadius: 5, backgroundColor: 'gray' }]} />
            <Text style={{ borderRadius: 5, backgroundColor: 'gray' }}></Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={wp_style.container}>
      <Text style={wp_style.header}>최근 내가 본 상품들</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={wp_style.wrapper} scrollEventThrottle={16}>
        {loading ? (
          <SkeletonComp />
        ) : (
          <View style={wp_style.boxes}>
            {products.map((val, idx) => (
              <View key={idx} style={wp_style.box}>
                <View>
                  <Image style={wp_style.img} source={{ uri: val.images[0].imgUrl }} />
                  <Text style={wp_style.name}>{val.name}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const wp_style = StyleSheet.create({
  container: { display: 'flex', flexDirection: 'column', marginVertical: 20 },
  header: { fontSize: 19, fontWeight: 'bold', marginBottom: 10 },
  wrapper: { display: 'flex', flexDirection: 'row' },
  boxes: { display: 'flex', flexDirection: 'row' },
  box: { display: 'flex', flexDirection: 'column', marginRight: 4 },
  img: { borderWidth: 1, borderColor: primary_gray, width: 95, height: 120 },
  name: { fontWeight: 'bold' },
});
