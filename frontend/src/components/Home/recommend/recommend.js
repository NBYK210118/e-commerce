import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { blue1 } from '../../../styles/common/colors';
import { RecommendLoading } from './recommend_loading';
import { useRecommendHooks } from '../../../hooks/RecommendHooks';
import Animated from 'react-native-reanimated';
import { Products } from './recommend_products';

export const RecommendProducts = () => {
  const { animatedStyle, handleMoveToProductDetail, loading, recommended_products, user } = useRecommendHooks();

  return (
    <View style={rc_style.container}>
      <Text style={rc_style.header}>
        <Text style={rc_style.header_username}>{user ? user.profile.nickname : '게스트'}</Text>님 추천 상품
      </Text>
      {
        <Animated.ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={16}>
          {loading ? (
            <RecommendLoading animatedStyle={animatedStyle} />
          ) : (
            <Products data={recommended_products} handleMoveToProductDetail={handleMoveToProductDetail} />
          )}
          {recommended_products === undefined ||
            recommended_products === null ||
            (recommended_products.length === 0 && <RecommendLoading animatedStyle={animatedStyle} />)}
        </Animated.ScrollView>
      }
    </View>
  );
};

const rc_style = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  header_username: { color: blue1 },
});
