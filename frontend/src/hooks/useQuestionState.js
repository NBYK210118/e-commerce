import { current } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export const useQuestionState = () => {
  const [active, setActive] = useState('');
  const [currentMenu, setCurrentMenu] = useState(entire_menus[0].category);
  const [currentSubmenu, setCurrentSubMenu] = useState(entire_menus[0].sub_category[0]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const borderBottomWidths = entire_menus.map(() => useSharedValue(0));

  useEffect(() => {
    borderBottomWidths[0].value = 3;
  }, []);

  const animatedStyle = (idx) => {
    return useAnimatedStyle(() => ({
      borderBottomWidth: borderBottomWidths[idx].value,
    }));
  };

  const handlePress = (category, selectedIdx) => {
    setCurrentMenu(category);
    borderBottomWidths.forEach((bord, idx) => {
      bord.value = withSpring(selectedIdx === idx ? 3 : 0, { duration: 500 });
    });
  };

  const handleTouchState = (idx) => {
    if (currentQuestion === idx) {
      setCurrentQuestion(0);
      return;
    }
    setCurrentQuestion(idx);
  };

  return {
    animatedStyle,
    handlePress,
    handleTouchState,
    currentMenu,
    setCurrentMenu,
    currentQuestion,
    handleTouchState,
  };
};
