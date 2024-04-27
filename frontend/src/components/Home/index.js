import { StyleSheet } from 'react-native';
import { Categories } from './category';
import { RecommendProducts } from './recommend';
import { MostViewedProducts } from './mostViewed';
import { DiscountProducts } from './discount';
import Animated from 'react-native-reanimated';
import { MenuBar } from './menu_bar';
import { CurrentLocation } from './CurrentLocation';
import { useSampleHook } from './useSampleHook';

export const HomeScreen = () => {
  const {
    token,
    active,
    borderWidths,
    currentLocation,
    handleLogin,
    menuBarStyle,
    scrollHandler,
    userInfo_loading,
    setActive,
    setHeadStatus,
  } = useSampleHook();

  return (
    <Animated.ScrollView style={styles.wrapper} scrollEventThrottle={16} onScroll={scrollHandler}>
      <CurrentLocation
        currentLocation={currentLocation}
        token={token}
        onPress={handleLogin}
        userInfo_loading={userInfo_loading}
      />
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
});
