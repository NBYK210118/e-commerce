import { StyleSheet } from 'react-native';
import { Categories } from './category/category';
import { RecommendProducts } from './recommend/recommend';
import { MostViewedProducts } from './most_viewed/mostViewed';
import { DiscountProducts } from './discount/discount';
import Animated from 'react-native-reanimated';
import { MenuBar } from './menu_bar';
import { CurrentLocation } from './CurrentLocation';
import { useHomeHooks } from '../../hooks/useHomeHooks';
import { FlashSaleComponent } from './FlashSale';
import { light_green } from '../../styles/common/colors';

export const HomeScreen = () => {
  const {
    token,
    active,
    currentLocation,
    userInfo_loading,
    handleLogin,
    menuBarStyle,
    scrollHandler,
    setActive,
    borderWidths,
    setSelected,
  } = useHomeHooks();

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
          menus={[...Array(7).fill(0)]}
          menuValues={borderWidths}
          setActive={setActive}
          setSelected={setSelected}
          menuStyle={menuBarStyle}
          color={light_green}
        />
      </Animated.View>

      {active === 0 && (
        <>
          <Categories />
          <FlashSaleComponent />
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
