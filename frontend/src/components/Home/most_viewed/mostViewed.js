import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { MostViewedLoading } from './most_viewed_loading';
import { Products } from './products';
import { useMostViewedHooks } from '../../../hooks/useMostViewedHooks';

export const MostViewedProducts = () => {
  const { animatedStyle, handleMoveToProductDetail, loading, mostviewed_products, opacity } = useMostViewedHooks();

  return (
    <View style={mv_style.content}>
      <Text style={mv_style.header}>실시간 조회수 상위</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={16}>
        {loading ? (
          <MostViewedLoading animatedStyle={animatedStyle} />
        ) : (
          <Products data={mostviewed_products} onPress={handleMoveToProductDetail} />
        )}
        {mostviewed_products === undefined ||
          mostviewed_products === null ||
          (mostviewed_products.length === 0 && <MostViewedLoading animatedStyle={animatedStyle} />)}
      </ScrollView>
    </View>
  );
};

const mv_style = StyleSheet.create({
  content: {
    marginTop: 20,
    marginHorizontal: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
});
