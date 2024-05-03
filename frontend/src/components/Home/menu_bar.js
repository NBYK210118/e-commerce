import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { light_green } from '../../styles/common/colors';
import { useEffect } from 'react';

export const MenuBar = ({ active = 0, setActive, setSelected, menus = [], menuValues = [], itemStyle = {}, color }) => {
  useEffect(() => {
    if (menus[0] !== undefined) {
      menuValues[0].value = withTiming(3, { duration: 500 });
      setActive(0);
    } else setActive(null);
  }, []);

  const handlePressHeaderMenu = (index, item) => {
    setActive(index);
    if (item.name !== undefined) {
      setSelected(item.name);
    } else {
      setSelected(item);
    }
    menuValues.forEach((menu, idx) => {
      menu.value = withTiming(index === idx ? 3 : 0, { duration: 500 });
    });
  };

  const animatedStyle = (idx) => {
    if (menuValues.length > 0) {
      return useAnimatedStyle(() => ({
        borderBottomWidth: active === idx ? menuValues[idx].value : 0,
        borderBottomColor: active === idx ? color : 'transparent',
      }));
    }
  };

  const textStyle = (idx) => {
    return {
      color: active === idx ? color : 'gray',
      fontWeight: active === idx ? '600' : '400',
    };
  };

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      style={{ borderWidth: 1, borderColor: 'rgba(0,0,0,0.1)' }}
    >
      {menus.map((item, idx) => (
        <Animated.View key={idx} style={[styles.menu_row, itemStyle, animatedStyle(idx)]}>
          <TouchableOpacity key={idx} onPress={() => handlePressHeaderMenu(idx, item)}>
            {item.name !== undefined && <Text style={textStyle(idx)}>{item.name}</Text>}
            {item !== undefined && typeof item !== 'number' ? (
              <Text style={textStyle(idx)}>{item}</Text>
            ) : (
              <Text style={textStyle(idx)}>{`Menu${idx + 1}`}</Text>
            )}
          </TouchableOpacity>
        </Animated.View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  menu_row: {
    padding: 9,
    marginHorizontal: 15,
  },
});
