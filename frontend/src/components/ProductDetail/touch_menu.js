import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { primary_gray } from '../../styles/common/colors';

export const TouchMenu = ({ currentProduct, onPress, activeMenu, borderWidths }) => {
  if (currentProduct) {
    const animatedStyle = (idx) => {
      return useAnimatedStyle(() => ({
        borderBottomWidth: activeMenu === idx && borderWidths[activeMenu].value,
      }));
    };

    return (
      <Animated.View style={styles.wrapper}>
        <Animated.View key={0} style={[styles.item, animatedStyle(0)]}>
          <TouchableOpacity onPress={() => onPress(0)}>
            <Text style={styles.item_txt}>제품 상세정보</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View key={1} style={[styles.item, animatedStyle(1)]}>
          <TouchableOpacity onPress={() => onPress(1)}>
            <Text style={styles.item_txt}>후기({currentProduct.reviews.length})</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View key={2} style={[styles.item, animatedStyle(2)]}>
          <TouchableOpacity onPress={() => onPress(2)}>
            <Text style={styles.item_txt}>제품 문의</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  }
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginLeft: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: primary_gray,
    borderBottomColor: primary_gray,
  },
  item: {
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    borderBottomColor: '#3E9BF9',
  },
  item_txt: { fontSize: 16, textAlign: 'center', color: '#32BBF7', fontWeight: '500' },
});
