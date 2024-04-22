import { useCallback, useState } from 'react';
import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProductApi from '../../services/product_api';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { ImageViewer } from './ImageViewer';
import { AntIcon } from '../icons/icons';
import { primary_gray } from '../../styles/common/colors';
import { AntDesign, Feather } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { Pagination } from '../pagination';

export const ProductDetail = () => {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [productImgs, setProductImgs] = useState([]);
  const [heart, setHeart] = useState(false);
  const selectedProductId = useSelector((state) => state.products.selectedProductId);
  const [currentPage, setCurrentPage] = useState(0);
  const [detailImgs, setDetailImgs] = useState([]);
  const { width } = Dimensions.get('window');

  const handleHorizontalScroll = (event) => {
    // 현재 x 좌표 얻기
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    // x 좌표값을 너비로 나누고 반올림 -> 몇 번째 페이지인지에 대한 값 도출
    const currentPageIndex = Math.round(contentOffsetX / width);
    setCurrentPage(currentPageIndex);
  };

  useFocusEffect(
    useCallback(() => {
      if (selectedProductId) {
        ProductApi.findProduct(selectedProductId).then((response) => {
          if (response.data) {
            setCurrentProduct(response.data);
            setProductImgs(response.data.images);
            setDetailImgs(response.data.detailImgs);
          }
        });
      }
    }, [selectedProductId])
  );

  return (
    <>
      <Animated.ScrollView style={styles.wrapper} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginLeft: 5 }}
          scrollEventThrottle={16}
          onScroll={handleHorizontalScroll}
          pagingEnabled
        >
          <ImageViewer item={currentProduct} style={styles.image} />
        </ScrollView>
        <Pagination contents={productImgs} current={currentPage} />
        <View style={{ marginLeft: 15, borderBottomWidth: 1.5 }}>
          <Text style={{ paddingVertical: 20, color: 'gray' }}>{currentProduct && currentProduct.category_name}</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 25 }}>
            {currentProduct && currentProduct.name}
          </Text>
          <View style={{ flexDirection: 'row', marginBottom: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
              {[...Array(5)].map((_, idx) => (
                <AntIcon key={idx} name={'star'} size={20} color={'#f4cf0f'} />
              ))}
            </View>
            <View style={{ marginTop: 2, marginRight: 10 }}>
              <Text style={{ color: 'gray' }}>4.8</Text>
            </View>
            <View style={{ marginTop: 2 }}>
              <Text style={{ color: '#0096FF', fontWeight: '800' }}>후기 532개</Text>
            </View>
          </View>
          <View style={{ marginTop: 5 }}>
            <Text style={{ fontSize: 20, fontWeight: '600' }}>183,800 ~ 200,000원</Text>
          </View>
          <View style={{ marginTop: 10, marginBottom: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 17, color: primary_gray, textDecorationLine: 'line-through' }}>
              250,000원
            </Text>
          </View>
        </View>
        <View style={{ marginLeft: 15, marginVertical: 15 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold' }}>제품 설명: </Text>
            <Text style={{ marginBottom: 20 }}>
              {currentProduct && currentProduct.description.length > 0
                ? currentProduct.description
                : '상품 상세설명이 없습니다!'}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 15 }}>
            <Text style={{ fontWeight: 'bold' }}>제작/유통사:</Text>
            <Text> {currentProduct && currentProduct.manufacturer}</Text>
          </View>
          <FlatList
            horizontal={true}
            data={detailImgs}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <Image key={index} source={{ uri: item }} style={styles.detail_imgs} resizeMode="contain" />
            )}
          />
        </View>
        <View style={styles.btn_row}>
          <View style={{ marginRight: 20 }}>
            <TouchableOpacity style={styles.basket_btn}>
              <Feather name="shopping-bag" size={24} color="black" style={{ marginRight: 5 }} />
              <Text>장바구니 담기</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.like_btn} onPress={() => setHeart(!heart)}>
              <AntDesign
                name={`${heart ? 'heart' : 'hearto'}`}
                size={24}
                color={`${heart ? 'red' : 'black'}`}
                style={{ marginRight: 5 }}
              />
              <Text>좋아요</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.ScrollView>
      <View>
        <View style={styles.fixed_btns}>
          <Pressable style={styles.fixed_left_btn} onPress={() => setHeart(!heart)}>
            <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: 7 }}>
              <AntDesign name={`${heart ? 'heart' : 'hearto'}`} size={20} color={`${heart ? 'red' : 'black'}`} />
              <Text style={{ fontSize: 14 }}>16,253</Text>
            </View>
          </Pressable>
          <Pressable style={styles.fixed_right_btn}>
            <Text style={{ fontSize: 20, color: 'white', paddingVertical: 15 }}>구매하기</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: { position: 'relative', paddingRight: 10, paddingVertical: 15 },
  image: { width: Dimensions.get('window').width, height: 300 },
  detail_imgs: { width: 350, height: 340 },
  btn_row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 150,
  },
  basket_btn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: primary_gray,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  like_btn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: primary_gray,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  fixed_btns: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: '100%',
    marginLeft: -5,
    shadowRadius: 5,
    shadowColor: 'gray',
    shadowOpacity: 0.5,
  },
  fixed_left_btn: { width: '20%' },
  fixed_right_btn: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(59 130 246)',
    borderRadius: 5,
  },
});
