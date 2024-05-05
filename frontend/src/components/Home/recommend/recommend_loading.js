import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { primary_gray } from '../../../styles/common/colors';

export const RecommendLoading = ({ animatedStyle }) => {
  return (
    <>
      {[...Array(6)].map((_, idx) => (
        <Animated.View>
          <TouchableOpacity key={idx} style={styles.box}>
            <Animated.Image style={[styles.img, { backgroundColor: primary_gray }, animatedStyle]} />
          </TouchableOpacity>
        </Animated.View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 5,
  },
  img: { width: 80, height: 80, borderRadius: 100 },
});
