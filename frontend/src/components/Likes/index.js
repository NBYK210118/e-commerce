import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { MenuBar } from '../Home/menu_bar';
import Animated, { useSharedValue } from 'react-native-reanimated';
import ProductApi from '../../services/product_api';
import { ProductItem } from './ProductItem';
import { light_green, primary_blue } from '../../styles/common/colors';
import { useLikeStates } from '../../hooks/useLikeStates';

export const Likes = () => {
  const { activeMenu, setActiveMenu, borderWidths, categories, dataSet, likesStatus, setSelectedMenu } =
    useLikeStates();

  return (
    <View style={styles.topWrapper}>
      <Animated.View>
        <MenuBar
          active={activeMenu}
          setActive={setActiveMenu}
          setSelected={setSelectedMenu}
          menus={categories}
          menuValues={borderWidths}
          color={light_green}
        />
      </Animated.View>
      <View style={{ padding: 5, marginLeft: 15, backgroundColor: '#fafafa' }}>
        <Text>
          총 <Text style={{ color: primary_blue, fontWeight: 'bold' }}>{dataSet.length}</Text>개의 상품을 좋아합니다
        </Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {dataSet.length > 0 &&
          dataSet.map((product, idx) => (
            <ProductItem key={idx} product={product} toggleLike={() => toggleLike(product)} likesStatus={likesStatus} />
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  topWrapper: {},
  scrollView: {
    backgroundColor: '#f5f5f5',
  },
});
