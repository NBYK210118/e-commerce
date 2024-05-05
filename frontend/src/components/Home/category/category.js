import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Pagination } from '../../pagination';
import { CategoryLoading } from './Category_loading';
import { useCategoryHooks } from '../../../hooks/useCategoryHooks';
const { width } = Dimensions.get('window');

export const Categories = () => {
  const { animatedStyle, handlePress, handleScroll, pages, loading, category_datas, currentPage } = useCategoryHooks();

  return (
    <View>
      <ScrollView
        horizontal
        scrollEventThrottle={16}
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      >
        {loading ? (
          <CategoryLoading animatedStyle={animatedStyle} />
        ) : (
          pages.map((page, idx) => (
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
          ))
        )}
        {category_datas === undefined ||
          category_datas === null ||
          (category_datas.length === 0 && <CategoryLoading animatedStyle={animatedStyle} />)}
      </ScrollView>
      <Pagination contents={pages} current={currentPage} />
    </View>
  );
};

const categories_style = StyleSheet.create({
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
