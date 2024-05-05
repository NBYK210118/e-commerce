import { StyleSheet, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { primary_gray } from '../../../styles/common/colors';

export const DiscountLoading = ({ animatedStyle }) => {
  return (
    <>
      {[...Array(5)].map((_, idx) => (
        <Animated.View key={idx} style={styles.box}>
          <Animated.Image style={[styles.img, { backgroundColor: primary_gray }, animatedStyle]} />
          <Animated.Text
            numberOfLines={2}
            style={[styles.name, { backgroundColor: primary_gray, width: 120, height: 10 }, animatedStyle]}
          />
          <Animated.View
            style={[styles.price_zone, { backgroundColor: primary_gray, width: 120, height: 10 }, animatedStyle]}
          >
            <Text style={styles.discount_price} />
          </Animated.View>
        </Animated.View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    marginRight: 5,
  },
  img: { width: 120, height: 100 },
  name: { fontWeight: 'bold', textAlign: 'center' },
  price_zone: { display: 'flex', flexDirection: 'row' },
  discount_price: { textAlign: 'center', fontSize: 12, marginLeft: 2 },
});
