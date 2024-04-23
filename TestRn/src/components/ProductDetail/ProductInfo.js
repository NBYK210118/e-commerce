import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { primary_gray } from '../../styles/common/colors';
import { AntDesign, Feather } from '@expo/vector-icons';
import { AntIcon } from '../icons/icons';

export const ProductInfo = ({ currentProduct, heart, onPress }) => {
  if (currentProduct) {
    return (
      <>
        <View style={styles.wrapper}>
          <Text style={styles.category}>{currentProduct.category_name}</Text>
          <Text style={styles.name}>{currentProduct.name}</Text>
          <View style={styles.mid}>
            <View style={styles.stars_arrange}>
              {[...Array(5)].map((_, idx) => (
                <AntIcon key={idx} name={'star'} size={20} color={'#f4cf0f'} />
              ))}
            </View>
            <View style={styles.star_count}>
              <Text style={styles.star_count_txt}>4.8</Text>
            </View>
            <View style={styles.review_wrap}>
              <Text style={styles.review_txt}>후기 532개</Text>
            </View>
          </View>
          <View style={styles.price}>
            <Text style={styles.price_txt}>183,800 ~ 200,000원</Text>
          </View>
          <View style={styles.origin_price}>
            <Text style={styles.origin_price_txt}>250,000원</Text>
          </View>
        </View>
        <View style={styles.sec_wrapper}>
          <View style={styles.description}>
            <Text style={styles.description_label}>제품 설명: </Text>
            <Text style={styles.description_txt}>
              {currentProduct.description.length > 0 ? currentProduct.description : '상품 상세설명이 없습니다!'}
            </Text>
          </View>
          <View style={styles.manufacturer}>
            <Text style={styles.manufacturer_label}>제작/유통사:</Text>
            <Text> {currentProduct.manufacturer}</Text>
          </View>

          <FlatList
            horizontal={true}
            data={currentProduct.detailImgs}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <Image source={{ uri: item }} style={styles.detail_imgs} resizeMode="contain" />
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
            <TouchableOpacity style={styles.like_btn} onPress={onPress}>
              <AntDesign
                name={`${heart[currentProduct.id] ? 'heart' : 'hearto'}`}
                size={24}
                color={`${heart[currentProduct.id] ? 'red' : 'black'}`}
                style={{ marginRight: 5 }}
              />
              <Text>좋아요</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  wrapper: { marginLeft: 15, borderBottomWidth: 1.5 },
  category: { paddingVertical: 20, color: 'gray' },
  name: { fontSize: 20, fontWeight: 'bold', marginBottom: 25 },
  mid: { flexDirection: 'row', marginBottom: 15 },
  stars_arrange: { flexDirection: 'row', alignItems: 'center', marginRight: 10 },
  star_count: { marginTop: 2, marginRight: 10 },
  star_count_txt: { color: 'gray' },
  review_wrap: { marginTop: 2 },
  review_txt: { color: '#0096FF', fontWeight: '800' },
  price: { marginTop: 5 },
  price_txt: { fontSize: 20, fontWeight: '600' },
  origin_price: { marginTop: 10, marginBottom: 20 },
  origin_price_txt: { fontWeight: 'bold', fontSize: 17, color: primary_gray, textDecorationLine: 'line-through' },
  sec_wrapper: { marginLeft: 15, marginVertical: 15 },
  description: { flexDirection: 'row' },
  description_label: { fontWeight: 'bold' },
  description_txt: { marginBottom: 20 },
  manufacturer: { flexDirection: 'row', marginVertical: 15 },
  manufacturer_label: { fontWeight: 'bold' },
  btn_row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  detail_imgs: { width: 350, height: 340 },
});
