import { Animated, PanResponder, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { setOptionsVisible } from '../../../features/auth/auth_slice';
import { useSelector, useDispatch } from 'react-redux';

export const ProductButton = ({ navigation, deleteProducts }) => {
  const panY = useRef(new Animated.Value(0)).current;
  const optionsVisible = useSelector((state) => state.userAuth.optionsVisible);
  const dispatch = useDispatch();

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        panY.setOffset(panY._value);
      },
      onPanResponderMove: Animated.event([null, { dy: panY }], { useNativeDriver: false }),
      onPanResponderRelease: () => {
        panY.flattenOffset();
      },
    })
  ).current;

  return (
    <>
      {optionsVisible ? (
        <Animated.View>
          <TouchableOpacity style={[styles.bottom_Button, styles.delete]} onPress={deleteProducts}>
            <Text style={styles.addButtonText}>상품 판매취소</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bottom_Button]} onPress={() => navigation.navigate('Manage')}>
            <Text style={styles.addButtonText}>상품 추가</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bottom_Button, styles.before]}
            onPress={() => dispatch(setOptionsVisible(false))}
          >
            <Text style={styles.addButtonText}>이전으로</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.button,
            {
              transform: [{ translateY: panY }],
            },
          ]}
        >
          <TouchableOpacity onPress={() => dispatch(setOptionsVisible(true))}>
            <AntDesign name="caretleft" size={34} color="black" />
          </TouchableOpacity>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 15,
    right: 0,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: 'rgba(222, 222, 222, 0.66)',
  },
  bottom_Button: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#0ea5e9',
    padding: 15,
    borderRadius: 30,
  },
  delete: {
    backgroundColor: 'rgba(234, 102, 42, 1)',
    bottom: 85,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  cancel: { backgroundColor: 'rgba(234, 211, 42, 1)', bottom: 150 },
  btn_txt: { fontSize: 14, textAlign: 'center', color: 'white' },
  before: {
    bottom: 150,
    backgroundColor: 'rgba(209, 209, 209, 1)',
  },
});

export default React.memo(ProductButton);
