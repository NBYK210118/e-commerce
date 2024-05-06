import { Dimensions, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { primary_gray } from '../../../styles/common/colors';

export const CategoryLoading = ({ animatedStyle }) => {
  return (
    <>
      {[...Array(2)].map((_, idx) => (
        <Animated.View key={idx} style={[styles.page]}>
          {[...Array(7)].map((_, idx) => (
            <View key={idx} style={[styles.categoryBox, { paddingVertical: 5 }]}>
              <Animated.Image style={[styles.image, { backgroundColor: primary_gray }, animatedStyle]} />
              <Animated.Text
                style={[styles.categoryText, { backgroundColor: primary_gray, width: 80, height: 20 }, animatedStyle]}
              />
            </View>
          ))}
        </Animated.View>
      ))}
    </>
  );
};

const width = Dimensions.get('window').width;
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
