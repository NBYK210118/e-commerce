import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Categories } from './category';
import { RecommendProducts } from './recommend';
import { MostViewedProducts } from './mostViewed';
import { DiscountProducts } from './discount';
import { useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { MenuBar } from './menu_bar';

export const HomeScreen = () => {
  //상단 메뉴 중 활성화된 메뉴 State
  const [active, setActive] = useState(0);
  //상단 메뉴 선택 상태 관리 State
  const [headStatus, setHeadStatus] = useState({});
  const borderWidths = [...Array(7)].map(() => useSharedValue(0));
  const currentLocation = useSelector((val) => val.userAuth.address);
  const userInfo_loading = useSelector((val) => val.userAuth.loading);
  const token = useSelector((val) => val.userAuth.token);
  const navigation = useNavigation();
  const scrollY = useSharedValue(0);

  useEffect(() => {
    if (headStatus.length > 0) {
      setActive(active);
      headStatus[active].value = withTiming(3, { duration: 300 });
      setHeadStatus(
        [...Array(headStatus.length)].reduce((acc, _, idx) => {
          acc[idx] = false;
          return acc;
        }, {})
      );
    }
  }, []);

  // 스크롤 핸들러 정의
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // 스크롤에 따른 메뉴바 스타일 조정
  const menuBarStyle = useAnimatedStyle(() => {
    const translateY = interpolate(scrollY.value, [30, 31], [0, 10], Extrapolation.CLAMP);

    return {
      transform: [{ translateY }],
      position: scrollY.value > 30 ? 'absolute' : 'relative',
      top: scrollY.value > 30 ? scrollY.value - 14 : 'auto',
      left: 0,
      right: 0,
      zIndex: 1,
      backgroundColor: 'white',
    };
  });

  const handleLogin = () => {
    if (!token) {
      navigation.navigate('Login');
    } else {
      navigation.navigate('Profile');
    }
  };

  return (
    <Animated.ScrollView style={styles.wrapper} scrollEventThrottle={16} onScroll={scrollHandler}>
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
      <Animated.View style={menuBarStyle}>
        <MenuBar
          active={active}
          setActive={setActive}
          menus={borderWidths}
          setHeadStatus={setHeadStatus}
          menuStyle={menuBarStyle}
        />
      </Animated.View>

      {active === 0 && (
        <>
          <Categories />
          <RecommendProducts />
          <MostViewedProducts />
          <DiscountProducts />
        </>
      )}
    </Animated.ScrollView>
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
