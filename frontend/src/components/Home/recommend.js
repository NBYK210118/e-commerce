import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { blue1, primary_gray } from '../../styles/common/colors';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getRecommendProduct } from '../../features/products/product_thunk';
import Animated, { useSharedValue, withTiming, withRepeat, useAnimatedStyle } from 'react-native-reanimated';
import { setSelectedProduct } from '../../features/products/product_slice';

export const RecommendProducts = () => {
  const loading = useSelector((state) => state.products.loading);
  const user = useSelector((state) => state.userAuth.user);
  const recommended_products = useSelector((state) => state.products.recommended);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const opacity = useSharedValue(0.5);

  const handleMoveToProductDetail = (idx) => {
    dispatch(setSelectedProduct(idx));
    navigation.navigate('Product');
  };

  useEffect(() => {
    if (!loading) {
      opacity.value = withTiming(0, { duration: 1000 });
    } else {
      opacity.value = withRepeat(withTiming(0.3, { duration: 1000 }), -1, true);
    }
  }, [loading, opacity, navigation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useFocusEffect(
    useCallback(() => {
      if (recommended_products.length < 1) {
        dispatch(getRecommendProduct());
      }
    }, [dispatch, navigation])
  );

  return (
    <View style={rc_style.container}>
      <Text style={rc_style.header}>
        <Text style={rc_style.header_username}>{user ? user.profile.nickname : '게스트'}</Text>님 추천 상품
      </Text>
      {
        <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={16}>
          {loading
            ? [...Array(6)].map((_, idx) => (
                <TouchableOpacity key={idx} style={rc_style.box}>
                  <Animated.Image style={[rc_style.img, { backgroundColor: primary_gray }, animatedStyle]} />
                </TouchableOpacity>
              ))
            : recommended_products.map((val, idx) => (
                <TouchableOpacity key={idx} style={rc_style.box} onPress={() => handleMoveToProductDetail(val.id)}>
                  <Image source={{ uri: val.images[0].imgUrl }} style={rc_style.img} />
                </TouchableOpacity>
              ))}
        </ScrollView>
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
  box: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 5,
  },
  img: { width: 80, height: 80, borderRadius: 100 },
});
