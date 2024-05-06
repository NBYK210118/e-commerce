import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Pagination } from '../../pagination';
import { CategoryLoading } from './Category_loading';
import { useCategoryHooks } from '../../../hooks/useCategoryHooks';
import Animated from 'react-native-reanimated';
import { Items } from './category';
const { width } = Dimensions.get('window');

export const Categories = () => {
  const { animatedStyle, handlePress, handleScroll, loading, pages, category_datas, currentPage } = useCategoryHooks();
  return (
    <Animated.View>
      <Animated.ScrollView
        horizontal
        scrollEventThrottle={16}
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      >
        {loading ? (
          <CategoryLoading animatedStyle={animatedStyle} />
        ) : (
          <Items pages={pages} handlePress={handlePress} />
        )}
        {category_datas === undefined ||
          category_datas === null ||
          (category_datas.length === 0 && <CategoryLoading animatedStyle={animatedStyle} />)}
      </Animated.ScrollView>
      <Pagination contents={pages} current={currentPage} />
    </Animated.View>
  );
};

const categories_style = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paginationDot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'blue',
  },
  inactiveDot: {
    backgroundColor: 'gray',
  },
});
