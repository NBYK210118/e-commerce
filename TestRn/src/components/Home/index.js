import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Categories } from './category';
import { RecommendProducts } from './recommend';
import { MostViewedProducts } from './mostViewed';
import { DiscountProducts } from './discount';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {
  const currentLocation = useSelector((val) => val.userAuth.address);
  const userInfo_loading = useSelector((val) => val.userAuth.loading);
  const token = useSelector((val) => val.userAuth.token);
  const navigation = useNavigation();

  const handleLogin = () => {
    if (!token) {
      navigation.navigate('Login');
    } else {
      navigation.navigate('Profile');
    }
  };
  return (
    <ScrollView style={styles.wrapper}>
      <TouchableOpacity style={styles.header} onPress={handleLogin}>
        <FontAwesome name={token ? 'location-arrow' : 'sign-in'} size={20} color="black" style={{ marginRight: 7 }} />
        {token ? (
          <>
            <Text style={{ fontWeight: '500' }}>현재 배송지:</Text>
            <Text style={{ fontWeight: '200', color: 'black' }}>
              {userInfo_loading ? '불러오는 중...' : currentLocation}
            </Text>
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

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingLeft: 8,
    paddingVertical: 5,
    backgroundColor: 'rgba(47, 218, 233, 0.32)',
  },
});
