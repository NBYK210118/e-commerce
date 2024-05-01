import { View } from 'react-native';
import { primary_gray } from '../../styles/common/colors';
import Animated from 'react-native-reanimated';

export const PayInfoSkeleton = ({ loadingStyle }) => {
  return (
    <Animated.View style={{ padding: 10, backgroundColor: 'white', marginBottom: 20 }}>
      <Animated.Text style={[{ backgroundColor: primary_gray }, loadingStyle]} />
      <Animated.View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
        <Animated.Text style={[{ backgroundColor: primary_gray, width: 100, padding: 10 }, loadingStyle]} />
        <Animated.Text style={[{ backgroundColor: primary_gray, width: 100, padding: 10 }, loadingStyle]} />
      </Animated.View>
      <Animated.View
        style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25, marginVertical: 10 }}
      >
        <Animated.Text style={[loadingStyle, { backgroundColor: primary_gray, width: 100, padding: 10 }]} />
        <Animated.Text style={[{ backgroundColor: primary_gray, width: 100, padding: 10 }, loadingStyle]} />
      </Animated.View>
      <Animated.View
        style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25, marginVertical: 10 }}
      >
        <Animated.Text style={[{ backgroundColor: primary_gray, width: 100, padding: 10 }, loadingStyle]} />
        <Animated.Text style={[{ backgroundColor: primary_gray, width: 150, height: 75 }, loadingStyle]} />
      </Animated.View>
    </Animated.View>
  );
};
