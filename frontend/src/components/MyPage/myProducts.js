import { ScrollView, Text, View } from 'react-native';
import ReAnimated from 'react-native-reanimated';
import { primary_gray } from '../../styles/common/colors';
import ProductButton from './buttons/product_button';
import ProductItem from './ProductItem';
import SearchBar from './SearchBar';
import { HorizontalCategory } from './HorizontalCategory';
import { useMyProductState } from '../../hooks/useMyProductState';

export const MyProducts = () => {
  const {
    animatedStyle,
    animatedStyle2,
    categories,
    categoryStatus,
    checkStatus,
    deleteProducts,
    handleCategoryChecked,
    handleChecked,
    handleProductStatus,
    handleUpdateBtn,
    navigation,
    products,
    scrollHandler,
    scrollY,
    searchByKeyword,
    loading,
  } = useMyProductState();

  const LoadingSkeleton = ({ loadingStyle }) => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginLeft: 20, paddingTop: 10, paddingBottom: 30 }}>
        {[...Array(7)].map((_, idx) => (
          <ReAnimated.View key={idx} style={[{ flexDirection: 'row', marginBottom: 10 }]}>
            <ReAnimated.Image
              style={[{ width: 70, height: 70, marginHorizontal: 10, backgroundColor: primary_gray }, loadingStyle]}
            />
            <ReAnimated.View style={{ flexDirection: 'column', justifyContent: 'center' }}>
              <ReAnimated.Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[loadingStyle, { width: 180, height: 25, marginBottom: 10, backgroundColor: primary_gray }]}
              />
              <ReAnimated.Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[loadingStyle, { width: 180, height: 25, backgroundColor: primary_gray }]}
              />
            </ReAnimated.View>
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
              <ReAnimated.View
                style={[
                  { width: 50, height: 20, marginLeft: 5, marginBottom: 5, backgroundColor: primary_gray },
                  loadingStyle,
                ]}
              />
              <ReAnimated.View
                style={[{ width: 50, height: 20, marginLeft: 5, backgroundColor: primary_gray }, loadingStyle]}
              />
            </View>
          </ReAnimated.View>
        ))}
      </ScrollView>
    );
  };

  const NoProducts = () => {
    return (
      <View
        style={{
          position: 'absolute',
          backgroundColor: '#f5f5dc',
        }}
      >
        <Text>등록하신 상품이 없습니다!</Text>
      </View>
    );
  };

  return (
    <ReAnimated.View style={{ flexDirection: 'column', justifyContent: 'space-around', paddingBottom: 20 }}>
      <SearchBar onPress={searchByKeyword} />
      <HorizontalCategory categories={categories} categoryStatus={categoryStatus} onPress={handleCategoryChecked} />
      {loading ? (
        <LoadingSkeleton loadingStyle={animatedStyle} />
      ) : (
        <ReAnimated.FlatList
          data={products || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <ProductItem
              item={item}
              index={index}
              scrollY={scrollY}
              handleProductStatus={handleProductStatus}
              handleChecked={handleChecked}
              checkStatus={checkStatus}
              handleUpdateBtn={handleUpdateBtn}
            />
          )}
          onScroll={scrollHandler}
          scrollEventThrottle={18}
          ListEmptyComponent={<NoProducts />}
          style={animatedStyle2}
        />
      )}
      <ProductButton navigation={navigation} deleteProducts={deleteProducts} />
    </ReAnimated.View>
  );
};
