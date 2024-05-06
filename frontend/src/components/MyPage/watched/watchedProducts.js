import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SkeletonComp } from './watched_loading';
import { Products } from './Products';
import { useWatchedHooks } from '../../../hooks/useWatchedHooks';

export const WatchedProducts = () => {
  const { animatedStyle, loading, products } = useWatchedHooks();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>최근 내가 본 상품들</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.wrapper} scrollEventThrottle={16}>
        {loading ? <SkeletonComp animatedStyle={animatedStyle} /> : <Products data={products} />}
        {products === undefined || products === null || (products.length === 0 && <SkeletonComp />)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { display: 'flex', flexDirection: 'column', marginVertical: 20 },
  header: { fontSize: 19, fontWeight: 'bold', marginBottom: 10 },
  wrapper: { display: 'flex', flexDirection: 'row' },
});
