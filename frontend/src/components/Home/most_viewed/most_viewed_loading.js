import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { primary_gray } from '../../../styles/common/colors';

export const MostViewedLoading = ({ animatedStyle }) => {
  return (
    <>
      {[...Array(5)].map((_, idx) => (
        <Animated.View key={`view-${idx}`}>
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
  img: { width: 90, height: 100 },
});
