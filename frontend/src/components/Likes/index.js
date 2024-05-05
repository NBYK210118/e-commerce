import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { MenuBar } from '../Home/menu_bar';
import Animated, { useSharedValue } from 'react-native-reanimated';
import ProductApi from '../../services/product_api';
import { light_green, primary_blue } from '../../styles/common/colors';
import { useLikeStates } from '../../hooks/useLikeStates';
import LikesItem from './ProductItem';

export const Likes = () => {
  const { activeMenu, setActiveMenu, borderWidths, categories, dataSet, likesStatus, setSelectedMenu, toggleLike } =
    useLikeStates();
  return (
    <View style={styles.topWrapper}>
      <MenuBar
        active={activeMenu}
        setActive={setActiveMenu}
        setSelected={setSelectedMenu}
        menus={categories}
        menuValues={borderWidths}
        color={light_green}
      />
      <View style={{ padding: 5, marginLeft: 15, backgroundColor: '#fafafa' }}>
        <Text>
          총 <Text style={{ color: primary_blue, fontWeight: 'bold' }}>{dataSet.length}</Text>개의 상품을 좋아합니다
        </Text>
      </View>
      <FlatList
        data={dataSet}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <LikesItem product={item} toggleLike={toggleLike} likesStatus={likesStatus} />}
        style={styles.scrollView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topWrapper: {},
  scrollView: {
    backgroundColor: '#f5f5f5',
  },
});
