import { FlatList, View } from 'react-native';
import HorizontalCategory from '../MyPage/HorizontalCategory';
import { ProductItem } from './ProductItem';
import { useBasketHooks } from '../../hooks/useBasketHooks';

export const ProductList = ({ route }) => {
  const { products, categories, categoryStatus, numColumns, handleAddToBasket, handleButton, handleCategoryChecked } =
    useBasketHooks({
      route,
    });

  return (
    <View>
      <HorizontalCategory categories={categories} categoryStatus={categoryStatus} onPress={handleCategoryChecked} />
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
    </View>
  );
};
