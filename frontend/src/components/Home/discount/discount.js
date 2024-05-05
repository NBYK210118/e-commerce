import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { DiscountLoading } from './discount_loading';
import { Products } from './products';
import { useDiscountHooks } from '../../../hooks/useDiscountHooks';

export const DiscountProducts = () => {
  const { animatedStyle, discounting_products, handleMoveToDetail, loading } = useDiscountHooks();

  return (
    <View style={discount_style.container}>
      <Text style={discount_style.header}>지금 특별 할인!</Text>
      <Animated.ScrollView horizontal={true} showsHorizontalScrollIndicator={false} scrollEventThrottle={16}>
        {loading ? (
          <DiscountLoading animatedStyle={animatedStyle} />
        ) : (
          <Products products={discounting_products} handleMoveToDetail={handleMoveToDetail} />
        )}
        {discounting_products.length === 0 ||
          discounting_products === undefined ||
          (discounting_products === null && <DiscountLoading animatedStyle={animatedStyle} />)}
      </Animated.ScrollView>
    </View>
  );
};

const discount_style = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 10,
    paddingBottom: 40,
    display: 'flex',
    flexDirection: 'column',
  },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
});
