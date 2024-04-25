import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { primary_gray } from '../../styles/common/colors';

export const TouchMenu = ({ currentProduct, onPress, activeMenu, borderWidths }) => {
  if (currentProduct) {
    return (
      <Animated.View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 20,
          marginLeft: 5,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderTopColor: primary_gray,
          borderBottomColor: primary_gray,
        }}
      >
        <Animated.View
          style={[
            {
              padding: 10,
              paddingHorizontal: 25,
              borderRadius: 5,
              borderBottomColor: '#3E9BF9',
            },
            useAnimatedStyle(() => ({
              borderBottomWidth: activeMenu === 0 && borderWidths[activeMenu].value,
            })),
          ]}
        >
          <TouchableOpacity onPress={() => onPress(0)}>
            <Text style={{ fontSize: 16, textAlign: 'center', color: '#32BBF7', fontWeight: '500' }}>
              제품 상세정보
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            {
              padding: 10,
              paddingHorizontal: 25,
              borderRadius: 5,
              borderBottomColor: '#3E9BF9',
            },
            useAnimatedStyle(() => ({
              borderBottomWidth: activeMenu === 1 && borderWidths[activeMenu].value,
            })),
          ]}
        >
          <TouchableOpacity onPress={() => onPress(1)}>
            <Text style={{ fontSize: 16, textAlign: 'center', color: '#32BBF7', fontWeight: '500' }}>
              후기({currentProduct.reviews.length})
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            {
              padding: 10,
              paddingHorizontal: 25,
              borderRadius: 5,
              borderBottomColor: '#3E9BF9',
            },
            useAnimatedStyle(() => ({
              borderBottomWidth: activeMenu === 2 && borderWidths[activeMenu].value,
            })),
          ]}
        >
          <TouchableOpacity onPress={() => onPress(2)}>
            <Text style={{ fontSize: 16, textAlign: 'center', color: '#32BBF7', fontWeight: '500' }}>제품 문의</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  }
};
