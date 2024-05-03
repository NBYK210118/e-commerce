import { Pressable, ScrollView, Text, View } from 'react-native';
import { primary_gray } from '../../../styles/common/colors';
import { useEffect, useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

let data = ['전체', '배송 일반', '기타', '예약 배송', '무탠 픽업', '주문제작 배송', '부티크 배송'];

export const Contents = ({ selected }) => {
  const [selectedSubMenu, setSelectedSubMenu] = useState(0);
  const borderWidths = [...Array(data.length)].map(() => useSharedValue(0));

  useEffect(() => {
    borderWidths[0].value = withTiming(3, { duration: 500 });
  }, []);

  const toggleSubMenu = (idx) => {
    setSelectedSubMenu(idx);
    borderWidths.forEach((menu, idx) => {
      menu.value = withTiming(selectedSubMenu === idx ? 3 : 1, { duration: 500 });
    });
  };

  const animatedStyle = (idx) => {
    return useAnimatedStyle(() => ({
      borderWidth: idx === selectedSubMenu ? borderWidths[idx].value : 1,
      borderColor: idx === selectedSubMenu ? 'black' : primary_gray,
    }));
  };

  return (
    <>
      {selected === '배송' && (
        <ScrollView
          horizontal={true}
          contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-around', padding: 15 }}
        >
          {data.map((item, idx) => (
            <Animated.View
              key={idx}
              style={[
                {
                  borderWidth: 1,
                  borderColor: primary_gray,
                  padding: 7,
                  paddingHorizontal: 10,
                  marginHorizontal: 5,
                },
                animatedStyle(idx),
              ]}
            >
              <Pressable key={idx} onPress={() => toggleSubMenu(idx)}>
                <Text key={idx} style={{ color: primary_gray }}>
                  {item}
                </Text>
              </Pressable>
            </Animated.View>
          ))}
        </ScrollView>
      )}
    </>
  );
};
