import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export const AddressItem = ({ items, onPress, selectedAddress, style }) => {
  return (
    <>
      {items.map((val, idx) => (
        <TouchableOpacity key={idx} style={style} onPress={() => onPress(val)}>
          {selectedAddress === val && (
            <Entypo name="check" size={25} color="green" style={{ position: 'absolute', top: 6, right: 0 }} />
          )}
          <Text>{val}</Text>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default React.memo(AddressItem);
