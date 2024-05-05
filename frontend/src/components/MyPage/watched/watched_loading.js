import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { primary_gray } from '../../../styles/common/colors';

export const SkeletonComp = ({ animatedStyle }) => {
  return (
    <Animated.View style={styles.boxes}>
      {[...Array(5)].map((_, idx) => (
        <TouchableOpacity key={idx} style={[styles.box]}>
          <View>
            <Animated.Image style={[styles.img, { borderRadius: 5, backgroundColor: primary_gray }, animatedStyle]} />
            <Animated.Text style={[styles.name, { borderRadius: 5, backgroundColor: primary_gray }, animatedStyle]} />
          </View>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  boxes: { display: 'flex', flexDirection: 'row' },
  box: { display: 'flex', flexDirection: 'column', marginRight: 4 },
  img: { borderWidth: 1, borderColor: primary_gray, width: 95, height: 120 },
  name: { fontWeight: 'bold' },
});
