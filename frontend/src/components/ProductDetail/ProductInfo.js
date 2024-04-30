import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { primary_gray } from '../../styles/common/colors';
import { AntDesign } from '@expo/vector-icons';
export const ProductInfo = ({ currentProduct, currentStars }) => {
  if (currentProduct) {
    return (
      <>
        <View style={styles.wrapper}>
          <Text style={styles.category}>{currentProduct.category_name}</Text>
          <Text style={styles.name}>{currentProduct.name}</Text>
          <View style={styles.mid}>
            <View style={styles.stars_arrange}>
              {[...Array(currentStars > 0 ? currentStars : 5)].map((_, idx) => (
                <AntDesign
                  key={idx}
                  name={currentStars > 0 ? 'star' : 'staro'}
                  size={32}
                  color={currentStars > 0 ? '#f4cf0f' : 'gray'}
                />
              ))}
            </View>
            <View style={styles.star_count}>
              <Text style={styles.star_count_txt}>{Math.round(currentStars).toFixed(1)}</Text>
            </View>
            <View style={styles.review_wrap}>
              <Text style={styles.review_txt}>후기 {currentProduct.reviews.length}개</Text>
            </View>
          </View>
          {currentProduct.isDiscount && (
            <View style={styles.price}>
              <Text style={styles.price_txt}>{currentProduct.discountPrice.toLocaleString('ko-kr')}원</Text>
            </View>
          )}
          <View style={styles.origin_price}>
            <Text
              style={[
                styles.origin_price_txt,
                !currentProduct.isDiscount ? { textDecorationLine: 'none', color: 'black', fontWeight: 'bold' } : '',
              ]}
            >
              {currentProduct.price.toLocaleString('ko-kr')}원
            </Text>
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
              <Image key={index} source={{ uri: item }} style={styles.detail_imgs} resizeMode="contain" />
            )}
          />
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  wrapper: { marginLeft: 15, borderBottomWidth: 1.5 },
  category: { paddingVertical: 20, color: 'gray' },
  name: { fontSize: 20, fontWeight: 'bold', marginBottom: 25 },
  mid: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
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
  detail_imgs: { width: 350, height: 340 },
});
