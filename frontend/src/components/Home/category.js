import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { primary_gray } from '../../styles/common/colors';
import Animated, { withRepeat, withTiming, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { getCategory } from '../../features/products/product_thunk';
import { Pagination } from '../pagination';
const { width } = Dimensions.get('window');

export const Categories = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const category_datas = useSelector((val) => val.products.categories);
  const loading = useSelector((val) => val.products.loading);
  const [pages, setPages] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    dispatch(getCategory({ navigate: navigation }));
  }, []);

  useEffect(() => {
    if (!loading) {
      opacity.value = withTiming(0, { duration: 1000 });
    } else {
      opacity.value = withRepeat(withTiming(0.3, { duration: 1000 }), -1, true);
    }
  }, [loading, opacity, navigation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });
  const handleScroll = (event) => {
    // 현재 x 좌표 얻기
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    // x 좌표값을 너비로 나누고 반올림 -> 몇 번째 페이지인지에 대한 값 도출
    const currentPageIndex = Math.round(contentOffsetX / width);
    setCurrentPage(currentPageIndex);
  };

  useEffect(() => {
    if (category_datas.length > 0) {
      const itemsPerPage = Math.round(category_datas.length / 2);
      const newPages = [];
      for (let i = 0; i < category_datas.length; i += itemsPerPage) {
        newPages.push(category_datas.slice(i, i + itemsPerPage));
      }
      setPages(newPages);
    }
  }, [category_datas]);

  const handlePress = (category) => {
    navigation.navigate('ProductList', { categoryName: category });
  };

  return (
    <View style={categories_style.container}>
      <ScrollView
        horizontal
        scrollEventThrottle={16}
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      >
        {loading
          ? [...Array(2)].map((_, idx) => (
              <View key={idx} style={[categories_style.page]}>
                {[...Array(7)].map((_, idx) => (
                  <View key={idx} style={[categories_style.categoryBox, { paddingVertical: 5 }]}>
                    <Animated.Image
                      style={[categories_style.image, { backgroundColor: primary_gray }, animatedStyle]}
                    />
                    <Animated.Text
                      style={[
                        categories_style.categoryText,
                        { backgroundColor: primary_gray, width: 80, height: 20 },
                        animatedStyle,
                      ]}
                    />
                  </View>
                ))}
              </View>
            ))
          : pages.map((page, idx) => (
              <View key={idx} style={categories_style.page}>
                {page.map((category, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={categories_style.categoryBox}
                    onPress={() => handlePress(category.name)}
                  >
                    <Image source={{ uri: category.imgUrl }} style={categories_style.image} />
                    <Text style={categories_style.categoryText}>{category.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
      </ScrollView>
      <Pagination contents={pages} current={currentPage} />
    </View>
  );
};

const categories_style = StyleSheet.create({
  container: {
    display: 'flex',
  },
  page: {
    width: width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
  },
  categoryBox: {
    width: width / 4.2, // 3열 그리드로 표시
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#cfcfcf',
    borderRadius: 5,
    alignItems: 'center',
  },
  image: {
    width: 75,
    height: 55,
  },
  categoryText: {
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 5,
  },
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
