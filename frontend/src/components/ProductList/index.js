import { FlatList, View } from 'react-native';
import HorizontalCategory from '../MyPage/HorizontalCategory';
import { ProductItem } from './ProductItem';
import { ProductListLoading } from './product_list_loading';
import { useProductListHooks } from '../../hooks/useProductListHooks';

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
  } = useProductListHooks({
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
