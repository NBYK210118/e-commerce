import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

export const ScrollModalScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const scrollY = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
      if (scrollY.value > 50) {
        runOnJS(setModalVisible)(true);
      } else {
        runOnJS(setModalVisible)(false);
      }
    },
  });

  const modalAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(modalVisible ? 0 : 300, { duration: 500 }),
        },
      ],
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <View style={{ height: 500, justifyContent: 'center', alignItems: 'center', backgroundColor: 'gray' }}>
          {[...Array(15)].map((_, idx) => (
            <Text key={idx}>Keep scrolling to trigger the modal!</Text>
          ))}
        </View>
        <View style={{ height: 500, justifyContent: 'center', alignItems: 'center', backgroundColor: 'gray' }}>
          {[...Array(15)].map((_, idx) => (
            <Text key={idx}>Keep scrolling to trigger the modal!</Text>
          ))}
        </View>
        <View style={{ height: 500, justifyContent: 'center', alignItems: 'center', backgroundColor: 'gray' }}>
          {[...Array(15)].map((_, idx) => (
            <Text key={idx}>Keep scrolling to trigger the modal!</Text>
          ))}
        </View>
      </Animated.ScrollView>
      <Animated.View style={[styles.modalView, modalAnimation]}>
        <Text style={styles.modalText}>Buy Now</Text>
        <Button title="Close" onPress={() => setModalVisible(false)} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 300,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
});
