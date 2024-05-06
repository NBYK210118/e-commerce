import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const Items = ({ pages = [], handlePress }) => {
  if (pages !== undefined && pages !== null && pages.length > 0) {
    return (
      <>
        {pages.map((page, idx) => (
          <View key={idx} style={styles.page}>
            {page.map((category, idx) => (
              <TouchableOpacity key={idx} style={styles.categoryBox} onPress={() => handlePress(category.name)}>
                <Image source={{ uri: category.imgUrl }} style={styles.image} />
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </>
    );
  }
};
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
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
});
