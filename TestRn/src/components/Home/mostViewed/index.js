import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getMostViewedProducts } from '../../../features/products/product_thunk';
import { useCallback, useEffect } from 'react';

export const MostViewedProducts = () => {
  const mostviewed_products = useSelector((val) => val.products.mostViewed);
  const loading = useSelector((val) => val.products.loading);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      if (mostviewed_products.length < 1) {
        dispatch(getMostViewedProducts(navigation));
      }
    }, [dispatch, navigation])
  );

  return (
    <View style={mv_style.content}>
      <Text style={mv_style.header}>실시간 조회수 상위</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={16}>
        {loading ? (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginRight: 5,
            }}
          >
            <View style={{ width: 100, height: 100, backgroundColor: 'gray' }}></View>
          </View>
        ) : (
          mostviewed_products.map((val, idx) => (
            <TouchableOpacity key={idx} style={mv_style.box}>
              <Image source={{ uri: val.images[0]?.imgUrl }} style={mv_style.img} />
              <Text numberOfLines={2} style={mv_style.product_name}>
                {val.name}
              </Text>
              <Text style={mv_style.price}>{val.price.toLocaleString('ko-kr')}원</Text>
            </TouchableOpacity>
          ))
        )}
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
  box: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 5,
  },
  img: { width: 90, height: 100 },
  product_name: { fontWeight: 'bold', textAlign: 'center' },
  price: { textAlign: 'center' },
});
