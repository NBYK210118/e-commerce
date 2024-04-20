import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Categories } from './category';
import { RecommendProducts } from './recommend';
import { MostViewedProducts } from './mostViewed';
import { DiscountProducts } from './discount';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { light_green } from '../../styles/common/colors';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export const HomeScreen = () => {
  //상단 메뉴 선택 상태 관리 State
  const [headStatus, setHeadStatus] = useState({});
  //상단 메뉴 중 활성화된 메뉴 State
  const [activeHead, setActiveHead] = useState(0);
  const borderWidths = [...Array(7)].map(() => useSharedValue(0));
  const currentLocation = useSelector((val) => val.userAuth.address);
  const userInfo_loading = useSelector((val) => val.userAuth.loading);
  const token = useSelector((val) => val.userAuth.token);
  const navigation = useNavigation();

  useEffect(() => {
    setActiveHead(0);
    borderWidths[0].value = withTiming(3, { duration: 500 });
    setHeadStatus(
      [...Array(7)].reduce((acc, val, idx) => {
        acc[idx] = false;
        return acc;
      }, {})
    );
  }, []);

  const handlePressHeaderMenu = (index) => {
    setHeadStatus((prevState) => {
      let newState = { ...prevState };
      Object.keys(newState).forEach((key) => {
        if (key !== index) newState[key] = false;
      });
      newState[index] = !newState[index];
      setActiveHead(index);
      borderWidths.forEach((bw, idx) => {
        bw.value = withTiming(idx === index ? 3 : 0, { duration: 500 });
      });
      return newState;
    });
  };

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
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        style={{ marginBottom: 5, borderWidth: 1, borderColor: 'rgba(0,0,0,0.1)' }}
      >
        {[...Array(7)].map((_, idx) => (
          <Animated.View
            key={idx}
            style={[
              {
                padding: 9,
                marginHorizontal: 15,
              },
              useAnimatedStyle(() => ({
                borderBottomWidth: borderWidths[idx].value,
                borderBottomColor: idx === activeHead ? light_green : 'transparent',
              })),
            ]}
          >
            <TouchableOpacity key={idx} onPress={() => handlePressHeaderMenu(idx)}>
              <Text
                style={{
                  color: activeHead === idx ? light_green : 'gray',
                  fontWeight: activeHead === idx ? '600' : '400',
                }}
              >
                Menu{idx + 1}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>

      {activeHead === 0 && (
        <>
          <Categories />
          <RecommendProducts />
          <MostViewedProducts />
          <DiscountProducts />
        </>
      )}
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
    paddingLeft: 8,
    paddingVertical: 5,
    backgroundColor: 'rgba(47, 218, 233, 0.32)',
  },
});
