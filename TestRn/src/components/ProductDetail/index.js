import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ImageViewer } from './ImageViewer';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Pagination } from '../pagination';
import { FloatingBtns } from './FloatingBtns';
import { ProductInfo } from './ProductInfo';
import { useProductFetch } from './useProductFetch';
import { useEffect, useState } from 'react';
import { primary_gray } from '../../styles/common/colors';
import { TouchMenu } from './touch_menu';

export const ProductDetail = () => {
  const { currentPage, currentProduct, handleHeart, handleHorizontalScroll, heart } = useProductFetch();
  const borderWidths = [...Array(3)].map(() => useSharedValue(''));
  const [activeMenu, setActiveMenu] = useState(1);
  useEffect(() => {
    borderWidths[0].value = '#F2F3F4';
  }, []);

  const handlePress = (index) => {
    borderWidths[index].value = withTiming('#F2F3F4', { duration: 500 });
    setActiveMenu(index);
  };

  useEffect(() => {
    console.log('activeMenu: ', activeMenu);
  }, [activeMenu]);
  return (
    <>
      <Animated.ScrollView style={styles.wrapper} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
        <ImageViewer item={currentProduct} style={styles.image} onScroll={handleHorizontalScroll} />
        <Pagination contents={currentProduct && currentProduct.images} current={currentPage} />
        <ProductInfo currentProduct={currentProduct} heart={heart} onPress={handleHeart} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20,
            marginLeft: 5,
            marginBottom: 130,
            borderWidth: 1,
            borderColor: primary_gray,
          }}
        >
          <TouchMenu
            currentProduct={currentProduct}
            borderWidths={borderWidths}
            onPress={handlePress}
            activeMenu={activeMenu}
          />
        </View>
      </Animated.ScrollView>
      <FloatingBtns currentProduct={currentProduct} heart={heart} onPress={handleHeart} />
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: { position: 'relative', paddingRight: 10, paddingVertical: 15 },
  image: { width: Dimensions.get('window').width, height: 300 },
});
