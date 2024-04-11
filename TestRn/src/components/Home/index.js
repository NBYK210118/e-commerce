import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Categories } from '../categories/category';
import { RecommendProducts } from './recommend';
import { MostViewedProducts } from './mostViewed';
import { DiscountProducts } from './discount';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {
  const currentLocation = useSelector((val) => val.userAuth.address);
  const token = useSelector((val) => val.userAuth.token);
  const navigation = useNavigation();

  const handleLogin = () => {
    if (!token) {
      navigation.navigate('Login');
    }
  };

  return (
    <ScrollView style={home_style.wrapper}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          paddingLeft: 8,
          paddingVertical: 5,
          backgroundColor: 'rgba(47, 218, 233, 0.32)',
        }}
        onPress={handleLogin}
      >
        <FontAwesome name={token ? 'location-arrow' : 'sign-in'} size={20} color="black" style={{ marginRight: 7 }} />
        {token ? (
          <>
            <Text style={{ fontWeight: '500' }}>현재 배송지:</Text>
            <Text style={{ fontWeight: '200', color: 'black' }}>{currentLocation}</Text>
          </>
        ) : (
          <Text>상품을 구매하시려면 로그인이 필요합니다</Text>
        )}
      </TouchableOpacity>
      <Categories />
      <RecommendProducts />
      <MostViewedProducts />
      <DiscountProducts />
    </ScrollView>
  );
};

const home_style = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 10,
  },
});
