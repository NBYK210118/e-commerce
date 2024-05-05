import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { primary_gray } from '../../styles/common/colors';

export const ProductListLoading = ({ animatedStyle, howManyProducts = 9 }) => {
  return (
    <Animated.ScrollView horizontal contentContainerStyle={styles.container}>
      {[...Array(howManyProducts)].map((_, idx) => (
        <Animated.View key={`box-${idx}`} style={styles.box}>
          <Animated.Image style={[styles.img, animatedStyle]} />
          <Animated.Text style={[styles.txt, animatedStyle]} />
        </Animated.View>
      ))}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 2, flexWrap: 'wrap' },
  box: {
    width: 100,
    height: 150,
    margin: 10,
  },
  img: { width: 100, height: 120, backgroundColor: primary_gray },
  txt: { marginVertical: 10, backgroundColor: primary_gray, padding: 4, width: 100, height: 20 },
});
