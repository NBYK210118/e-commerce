import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, Extrapolation, interpolate } from 'react-native-reanimated';
import CheckBox from './checkbox/CheckBox';

const ITEM_HEIGHT = 100;

export const ProductItem = ({ item, index, scrollY, handleProductStatus, handleChecked, checkStatus }) => {
  // 항목의 높이와 검색바에 의해 가려지는 시점을 계산
  const inputRange = [-1, 0, ITEM_HEIGHT * index, ITEM_HEIGHT * (index + 0.5)]; // index 번째 항목 기준 0.5만큼 내려왔을 때
  const outputRange = [1, 1, 1.3, 0.71];

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, inputRange, outputRange, Extrapolation.CLAMP);
    return { opacity };
  });

  return (
    <Animated.View style={[styles.productItem, animatedStyle]}>
      <View style={styles.productItem}>
        <CheckBox item={item} checkStatus={checkStatus} handleChecked={handleChecked} />
        <Image source={{ uri: item.images[0].imgUrl }} style={styles.productImage} />
        <View style={{ overflow: 'hidden', marginRight: 50 }}>
          <Text style={{ color: 'blue', fontSize: 11, marginBottom: 3 }}>{item.category_name}</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.productName}>
            {item.name}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 12 }}>
            {item.isDiscount ? item.discountPrice.toLocaleString('ko-kr') : item.price.toLocaleString('ko-kr')}원 |
            재고: {item.inventory}
          </Text>
          <Text style={{ color: item.status === '판매중' ? 'black' : 'red' }}>{item.status}</Text>
        </View>
        <View style={styles.managementButtons}>
          <TouchableOpacity style={[styles.button, styles.edit]}>
            <Text style={{ color: 'white', textAlign: 'center' }}>수정</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.update]} onPress={() => handleProductStatus(item.id)}>
            <Text style={{ color: 'white' }}>판매/보류</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  productItem: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 70,
    height: 70,
    marginHorizontal: 10,
  },
  productName: {
    fontWeight: 'bold',
  },
  managementButtons: {
    flexDirection: 'column',
    marginLeft: 'auto',
  },
  button: {
    marginVertical: 3,
    marginLeft: 10,
    padding: 7,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  edit: {
    backgroundColor: 'rgba(68, 194, 42, 0.95)',
  },
  update: { backgroundColor: 'rgba(42, 141, 234, 0.85)' },
});

export default React.memo(ProductItem);
