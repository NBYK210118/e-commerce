import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DropdownMenu = ({ selectedItem, setSelectedItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const items = ['판매중', '보류중'];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectItem = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: selectedItem === '보류중' ? '#f4cf0f' : '#57e4f7' }]}
        onPress={toggleDropdown}
      >
        <Text style={styles.buttonText}>{selectedItem}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdown}>
          {items.map((item, index) => (
            <TouchableOpacity key={index} style={styles.dropdownItem} onPress={() => selectItem(item)}>
              <Text style={styles.dropdownText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 200,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: 'white',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    width: 200,
  },
  dropdownItem: {
    padding: 10,
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
  },
  dropdownText: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default DropdownMenu;
