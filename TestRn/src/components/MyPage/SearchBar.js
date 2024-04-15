import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { primary_gray } from '../../styles/common/colors';

export const SearchBar = ({ onPress }) => {
  const [keyword, setKeyword] = useState('');
  return (
    <View>
      <TextInput style={styles.searchInput} placeholder="상품 검색..." onChangeText={setKeyword} value={keyword} />
      <TouchableOpacity style={styles.searchIcon}>
        <AntDesign name="search1" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    marginHorizontal: 10,
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: primary_gray,
  },
  searchIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: primary_gray,
    padding: 7,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});

export default React.memo(SearchBar);
