import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

export const TouchMenu = ({ currentProduct, onPress, activeMenu }) => {
  return (
    <>
      <Animated.View
        style={[
          {
            padding: 10,
            borderRadius: 5,
          },
          useAnimatedStyle(() => ({
            backgroundColor: activeMenu === 0 ? '#F2F3F4' : 'transparent',
          })),
        ]}
      >
        <TouchableOpacity onPress={() => onPress(0)}>
          <Text style={{ fontSize: 16, textAlign: 'center', color: '#32BBF7', fontWeight: '500' }}>제품 상세정보</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={[
          {
            padding: 10,
            borderRadius: 5,
          },
          useAnimatedStyle(() => ({
            backgroundColor: activeMenu === 1 ? '#F2F3F4' : 'transparent',
          })),
        ]}
      >
        <TouchableOpacity onPress={() => onPress(1)}>
          <Text style={{ fontSize: 16, textAlign: 'center', color: '#32BBF7', fontWeight: '500' }}>
            후기(${currentProduct.reviews.length})
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={[
          {
            padding: 10,
            borderRadius: 5,
          },
          useAnimatedStyle(() => ({
            backgroundColor: activeMenu === 2 ? '#F2F3F4' : 'transparent',
          })),
        ]}
      >
        <TouchableOpacity onPress={() => onPress(2)}>
          <Text style={{ fontSize: 16, textAlign: 'center', color: '#32BBF7', fontWeight: '500' }}>제품 문의</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};
