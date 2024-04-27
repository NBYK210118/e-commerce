import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { ImageViewer } from './ImageViewer';
import Animated from 'react-native-reanimated';
import { Pagination } from '../pagination';
import { FloatingBtns } from './FloatingBtns';
import { ProductInfo } from './ProductInfo';
import { useProductFetch } from './useProductFetch';
import { primary_gray } from '../../styles/common/colors';
import { TouchMenu } from './touch_menu';
import { CreateReview } from './CreateReview';
import { AntDesign } from '@expo/vector-icons';

export const ProductDetail = () => {
  const {
    currentPage,
    currentProduct,
    handleHeart,
    handleHorizontalScroll,
    heart,
    isUsers,
    token,
    user,
    borderWidths,
    handlePress,
    activeMenu,
    navigation,
  } = useProductFetch();

  const handlePostReview = () => {
    if (!token || !user) {
      alert('로그인이 필요한 기능입니다');
      navigation.navigate('Login');
    }
  };

  return (
    <>
      <Animated.ScrollView style={styles.wrapper} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
        <ImageViewer item={currentProduct} style={styles.image} onScroll={handleHorizontalScroll} />
        <Pagination contents={currentProduct && currentProduct.images} current={currentPage} />
        <ProductInfo currentProduct={currentProduct} heart={heart} onPress={handleHeart} />
        <TouchMenu
          currentProduct={currentProduct}
          borderWidths={borderWidths}
          onPress={handlePress}
          activeMenu={activeMenu}
        />
        <View style={{ marginLeft: 15, marginTop: 20, marginBottom: 130 }}>
          {activeMenu === 0 && (
            <View>
              <Text>상세정보 탭</Text>
            </View>
          )}
          {activeMenu === 1 && (
            <View>
              {!isUsers && <CreateReview user={user} handlePostReview={handlePostReview} />}
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: primary_gray,
                  overflow: 'hidden',
                  padding: 10,
                  paddingVertical: 28,
                  marginBottom: 10,
                }}
              >
                <View>
                  <Image
                    source={{ uri: 'https://via.placeholder.com/100' }}
                    style={{ width: 60, height: 60, borderRadius: 100 }}
                  />
                </View>
                <View style={{ marginLeft: 14, marginTop: 5 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginBottom: 5, marginRight: 5, fontWeight: 'bold' }}>작성자 1</Text>
                    <View style={{ flexDirection: 'row', marginHorizontal: 5 }}>
                      {[...Array(5)].map((_, idx) => (
                        <AntDesign key={idx} name="star" size={15} color="#f4cf0f" />
                      ))}
                    </View>
                  </View>
                  <Text numberOfLines={2} style={{ fontSize: 14, marginTop: 10 }}>
                    상품의 퀄리티가 매우 좋습니다
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: primary_gray,
                  overflow: 'hidden',
                  padding: 10,
                  paddingVertical: 28,
                }}
              >
                <View>
                  <Image
                    source={{ uri: 'https://via.placeholder.com/100' }}
                    style={{ width: 60, height: 60, borderRadius: 100 }}
                  />
                </View>
                <View style={{ marginLeft: 14, marginTop: 5 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginBottom: 5, marginRight: 5, fontWeight: 'bold' }}>작성자 1</Text>
                    <View style={{ flexDirection: 'row', marginHorizontal: 5 }}>
                      {[...Array(5)].map((_, idx) => (
                        <AntDesign key={idx} name="star" size={15} color="#f4cf0f" />
                      ))}
                    </View>
                  </View>
                  <Text numberOfLines={2} style={{ fontSize: 14, marginTop: 10 }}>
                    상품의 퀄리티가 매우 좋습니다
                  </Text>
                </View>
              </View>
            </View>
          )}
          {activeMenu === 2 && (
            <View>
              <Text>제품 문의</Text>
            </View>
          )}
        </View>
      </Animated.ScrollView>
      <FloatingBtns currentProduct={currentProduct} heart={heart} onPress={handleHeart} />
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: { position: 'relative', paddingRight: 10, paddingVertical: 15 },
  image: { width: Dimensions.get('window').width, height: 300 },
});
