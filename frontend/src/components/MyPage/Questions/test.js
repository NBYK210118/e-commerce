import React, { ReactNode, useEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';

export const AnimateHoc = ({ duration, children }) => {
  const [init, setInit] = useState(false);
  const [_height, setHeight] = useState(0);
  const viewHeight = useSharedValue(0);

  useEffect(() => {
    if (!init && _height > 0) {
      viewHeight.value = _height;
      setInit(true);
    }
  }, [_height]);

  const onLayout = (e) => {
    const { height } = e.nativeEvent.layout;
    setHeight(height);
  };

  const fadeDown = useAnimatedStyle(() => {
    return {
      height: withTiming(viewHeight.value, {
        duration: duration || 750,
      }),
    };
  }, [init]);

  return (
    <>
      <Animated.View style={[{ height: 0, overflow: 'hidden' }, fadeDown]}>{children}</Animated.View>

      {!_height && (
        <View onLayout={onLayout} style={{ opacity: 0 }}>
          {children}
        </View>
      )}
    </>
  );
};
