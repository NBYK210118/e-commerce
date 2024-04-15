import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';

export const ProductButton = ({ navigation }) => {
  const [optionsVisible, setOptionsVisible] = useState(false);

  return (
    <>
      {optionsVisible ? (
        <View>
          <TouchableOpacity style={[styles.bottom_Button, styles.cancel]}>
            <Text style={styles.addButtonText}>상품 판매취소</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bottom_Button]} onPress={() => navigation.navigate('Add Product')}>
            <Text style={styles.addButtonText}>상품 추가</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bottom_Button, styles.sort_by_category]}>
            <Text style={styles.addButtonText}>카테고리별 정렬</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bottom_Button, styles.before]} onPress={() => setOptionsVisible(false)}>
            <Text style={styles.addButtonText}>이전으로</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => setOptionsVisible(!optionsVisible)}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
            backgroundColor: 'rgba(222, 222, 222, 0.66)',
          }}
        >
          <AntDesign name="caretleft" size={34} color="black" />
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  bottom_Button: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#0ea5e9',
    padding: 15,
    borderRadius: 30,
  },
  sort_by_category: {
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
    bottom: 210,
    backgroundColor: 'rgba(209, 209, 209, 1)',
  },
});

export default React.memo(ProductButton);
