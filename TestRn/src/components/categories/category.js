import { Animated, Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { getCategory } from '../../features/categories/categoryThunk';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export const Categories = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const category_datas = useSelector((val) => val.userAuth.categories);
  const loading = useSelector((val) => val.userAuth.loading);
  const [pages, setPages] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleScroll = (event) => {
    // 현재 x 좌표 얻기
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    // x 좌표값을 너비로 나누고 반올림 -> 몇 번째 페이지인지에 대한 값 도출
    const currentPageIndex = Math.round(contentOffsetX / width);
    setCurrentPage(currentPageIndex);
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(getCategory({ navigate: navigation }));
    }, [dispatch, navigation])
  );

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

  const FadeInView = () => {
    const [fadeAnim] = useState(new Animated.Value(0)); // 초기값 0

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }, [fadeAnim]);

    return (
      <View style={categories_style.page}>
        <View style={[categories_style.categoryBox, { borderWidth: 0 }]}>
          <Animated.Image
            source={{ uri: 'https://via.placeholder.com/50' }}
            style={[categories_style.image, { opacity: fadeAnim, backgroundColor: 'gray' }]}
          ></Animated.Image>
        </View>
        <View style={[categories_style.categoryBox, { borderWidth: 0 }]}>
          <Animated.Image
            source={{ uri: 'https://via.placeholder.com/50' }}
            style={[categories_style.image, { opacity: fadeAnim, backgroundColor: 'gray' }]}
          ></Animated.Image>
        </View>
        <View style={[categories_style.categoryBox, { borderWidth: 0 }]}>
          <Animated.Image
            source={{ uri: 'https://via.placeholder.com/50' }}
            style={[categories_style.image, { opacity: fadeAnim, backgroundColor: 'gray' }]}
          ></Animated.Image>
        </View>
        <View style={[categories_style.categoryBox, { borderWidth: 0 }]}>
          <Animated.Image
            source={{ uri: 'https://via.placeholder.com/50' }}
            style={[categories_style.image, { opacity: fadeAnim, backgroundColor: 'gray' }]}
          ></Animated.Image>
        </View>
        <View style={[categories_style.categoryBox, { borderWidth: 0 }]}>
          <Animated.Image
            source={{ uri: 'https://via.placeholder.com/50' }}
            style={[categories_style.image, { opacity: fadeAnim, backgroundColor: 'gray' }]}
          ></Animated.Image>
        </View>
        <View style={[categories_style.categoryBox, { borderWidth: 0 }]}>
          <Animated.Image
            source={{ uri: 'https://via.placeholder.com/50' }}
            style={[categories_style.image, { opacity: fadeAnim, backgroundColor: 'gray' }]}
          ></Animated.Image>
        </View>
        <View style={[categories_style.categoryBox, { borderWidth: 0 }]}>
          <Animated.Image
            source={{ uri: 'https://via.placeholder.com/50' }}
            style={[categories_style.image, { opacity: fadeAnim, backgroundColor: 'gray' }]}
          ></Animated.Image>
        </View>
      </View>
    );
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
        {loading ? (
          <FadeInView />
        ) : (
          pages.map((val, idx) => (
            <View key={idx} style={categories_style.page}>
              {val.map((category, idx) => (
                <View key={idx} style={categories_style.categoryBox}>
                  <Image source={{ uri: category.imgUrl }} style={categories_style.image} />
                  <Text style={categories_style.categoryText}>{category.name}</Text>
                </View>
              ))}
            </View>
          ))
        )}
      </ScrollView>
      {pages.length > 0 && (
        <View style={categories_style.paginationContainer}>
          {pages.map((_, idx) => (
            <View
              key={idx}
              style={[
                categories_style.paginationDot,
                currentPage === idx ? categories_style.activeDot : categories_style.inactiveDot,
              ]}
            />
          ))}
        </View>
      )}
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
