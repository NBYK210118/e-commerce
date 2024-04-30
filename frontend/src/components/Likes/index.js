import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { MenuBar } from '../Home/menu_bar';
import Animated, { useSharedValue } from 'react-native-reanimated';
import ProductApi from '../../services/product_api';
import { ProductItem } from './ProductItem';
import { primary_blue } from '../../styles/common/colors';

export const Likes = () => {
  const [dataSet, setDataSet] = useState([]);
  const [activeMenu, setActiveMenu] = useState(0);
  const [selectedMenu, setSelectedMenu] = useState('');
  const [likesStatus, setLikesStatus] = useState({});
  const navigation = useNavigation();
  const { user, token } = useSelector((state) => state.userAuth);
  const { categories, loading } = useSelector((state) => state.products);
  const borderWidths = [...Array(categories.length)].map(() => useSharedValue(0));

  useFocusEffect(
    useCallback(() => {
      if (token) {
        ProductApi.getUserLikes(token).then((response) => {
          setDataSet(response.data);
        });
      }
      setActiveMenu(null);
      setSelectedMenu('');
    }, [navigation])
  );

  useEffect(() => {
    if (dataSet.length > 0) {
      setLikesStatus(
        dataSet.reduce((acc, val) => {
          acc[val.id] = val.likedBy.some((like) => like.userId === user.id);
          return acc;
        }, {})
      );
    }
  }, [dataSet]);

  useEffect(() => {
    if (token && selectedMenu !== undefined) {
      ProductApi.getUserLikesByCategory(token, selectedMenu).then((response) => {
        setDataSet(response.data);
      });
    }
  }, [selectedMenu]);

  useFocusEffect(
    useCallback(() => {
      if (!token) {
        navigation.navigate('Login');
      }
    }, [token, navigation])
  );

  const toggleLike = (product) => {
    const condition = Object.keys(likesStatus).length > 0;
    const data = {
      ...likesStatus,
      [product.id]: !likesStatus[product.id],
    };

    setLikesStatus(data);

    if (token && condition) {
      ProductApi.updatelikeProduct(token, data).then((response) => {
        setDataSet(response.data.products);
      });
    }
  };

  return (
    <View style={styles.topWrapper}>
      <Animated.View>
        <MenuBar
          active={activeMenu}
          setActive={setActiveMenu}
          setSelected={setSelectedMenu}
          menus={categories}
          menuValues={borderWidths}
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
  topWrapper: { paddingBottom: 70 },
  scrollView: {
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
});
