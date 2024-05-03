import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { ImageViewer } from './ImageViewer';
import Animated from 'react-native-reanimated';
import { Pagination } from '../pagination';
import { FloatingBtns } from './FloatingBtns';
import { ProductInfo } from './ProductInfo';
import { useProductFetch } from './useProductFetch';
import { TouchMenu } from './touch_menu';
import { CreateReview } from './CreateReview';
import { Review } from './Reviews';
import { UsersReviews } from './UsersReviews';
import { EmptyReviewList } from './EmptyReviewList';
import { HeartBasket } from './heart_basket';

export const ProductDetail = () => {
  const {
    currentPage,
    currentStars,
    currentProduct,
    handleHeart,
    handleHorizontalScroll,
    heart,
    isUsers,
    user,
    borderWidths,
    handlePress,
    activeMenu,
    navigation,
    reviews,
    userReviewed,
    selectedProductId,
    handleAddToBasket,
    handlePostReview,
  } = useProductFetch();

  if (currentProduct !== undefined && currentProduct !== null) {
    return (
      <>
        <Animated.ScrollView style={styles.wrapper} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
          <ImageViewer item={currentProduct} style={styles.image} onScroll={handleHorizontalScroll} />
          <Pagination contents={currentProduct.images} current={currentPage} />
          <ProductInfo
            currentProduct={currentProduct}
            currentStars={currentStars}
            heart={heart}
            onPress={handleHeart}
            onPressBasket={handleAddToBasket}
          />
          <FlatList
            horizontal={true}
            data={currentProduct.detailImgs}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <Image source={{ uri: item }} style={styles.detail_imgs} resizeMode="contain" />}
          />

          <HeartBasket
            currentProduct={currentProduct}
            heart={heart}
            onPress={handleHeart}
            onPressBasket={handleAddToBasket}
          />
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
                {/* 게스트 또는 로그인한 사용자가 판매 등록한 상품이 아니고, 이전에 리뷰를 등록한 적이 없는 경우 렌더링*/}
                {!isUsers && !userReviewed ? (
                  <CreateReview
                    user={user}
                    handlePostReview={handlePostReview}
                    navigation={navigation}
                    selectedProductId={selectedProductId}
                  />
                ) : (
                  <Review userReviewed={userReviewed} reviewList={false} />
                )}
                {reviews.length > 0 ? <UsersReviews reviews={reviews} reviewList={true} /> : <EmptyReviewList />}
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
  }
};

const styles = StyleSheet.create({
  wrapper: { position: 'relative', paddingRight: 10, paddingVertical: 15 },
  image: { width: Dimensions.get('window').width, height: 300 },
  detail_imgs: { width: 350, height: 340 },
});
