import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import ProductApi from '../../../services/product_api';
import { wp_style } from '../../../styles/mypage_style/watched_products/style';

export const WatchedProducts = () => {
  const token = useSelector((val) => val.userAuth.token);
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (products.length < 1) {
      ProductApi.userRecentWatched(token, navigation).then((response) => {
        setProducts(response.data);
      });
    }
  }, []);

  useEffect(() => {}, [products]);

  return (
    <View style={wp_style.container}>
      <Text style={wp_style.header}>최근 내가 본 상품들</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={wp_style.wrapper} scrollEventThrottle={16}>
        <View style={wp_style.boxes}>
          {products.length > 0 &&
            products.map((val, idx) => (
              <View key={idx} style={wp_style.box}>
                <View>
                  <Image style={wp_style.img} source={{ uri: val.images[0].imgUrl }} />
                  <Text style={wp_style.name}>{val.name}</Text>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};
