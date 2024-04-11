import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { blue1 } from '../../../styles/common/colors';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getRecommendProduct } from '../../../features/products/product_thunk';

export const RecommendProducts = () => {
  const loading = useSelector((val) => val.products.loading);
  const recommended_products = useSelector((val) => val.products.recommended);
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
        <Text style={rc_style.header_username}>회원님</Text> 추천 상품
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={16}>
        {recommended_products.map((val, idx) => (
          <TouchableOpacity key={idx} style={rc_style.box}>
            <Image source={{ uri: val.images[0].imgUrl }} style={rc_style.img} />
          </TouchableOpacity>
        ))}
      </ScrollView>
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
