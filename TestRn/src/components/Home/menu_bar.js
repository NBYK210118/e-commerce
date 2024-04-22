import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { light_green } from '../../styles/common/colors';
import { useEffect } from 'react';

export const MenuBar = ({ active = 0, setActive, setHeadStatus, menus = [] }) => {
  const handlePressHeaderMenu = (index) => {
    setHeadStatus((prevState) => {
      let newState = { ...prevState };
      Object.keys(newState).forEach((key) => {
        if (key !== index) newState[key] = false;
      });
      newState[index] = !newState[index];
      setActive(index);
      menus.forEach((menu, idx) => {
        menu.value = withTiming(idx === index ? 3 : 0, { duration: 500 });
      });
      return newState;
    });
  };
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.1)' }}
    >
      {[...Array(menus.length)].map((_, idx) => (
        <Animated.View
          key={idx}
          style={[
            {
              padding: 9,
              marginHorizontal: 15,
            },
            useAnimatedStyle(() => ({
              borderBottomWidth: menus[idx].value,
              borderBottomColor: idx === active ? light_green : 'transparent',
            })),
          ]}
        >
          <TouchableOpacity key={idx} onPress={() => handlePressHeaderMenu(idx)}>
            <Text
              style={{
                color: active === idx ? light_green : 'gray',
                fontWeight: active === idx ? '600' : '400',
              }}
            >
              Menu{idx + 1}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </ScrollView>
  );
};
