import { FlatList, ScrollView, View } from 'react-native';
import HorizontalCategory from '../MyPage/HorizontalCategory';
import { ProductItem } from './ProductItem';
import { useBasketHooks } from '../../hooks/useBasketHooks';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { primary_gray } from '../../styles/common/colors';
import { useEffect } from 'react';
import { ProductListLoading } from './product_list_loading';

export const ProductList = ({ route }) => {
  const {
    products,
    categories,
    categoryStatus,
    loading,
    numColumns,
    handleAddToBasket,
    handleButton,
    handleCategoryChecked,
    animatedStyle,
  } = useBasketHooks({
    route,
  });

  return (
    <View>
      <HorizontalCategory categories={categories} categoryStatus={categoryStatus} onPress={handleCategoryChecked} />
      {loading ? (
        <ProductListLoading howManyProducts={products.length} animatedStyle={animatedStyle} />
      ) : (
        <FlatList
          data={products}
          key={String(numColumns)}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ProductItem item={item} addToBasket={handleAddToBasket} handleButton={handleButton} />
          )}
          numColumns={numColumns}
          style={{ padding: 20, paddingBottom: 40 }}
        />
      )}
      {products === undefined ||
        products === null ||
        (products.length === 0 && (
          <ProductListLoading howManyProducts={products.length} animatedStyle={animatedStyle} />
        ))}
    </View>
  );
};
