import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AntDesign, FontAwesome6 } from '@expo/vector-icons';

export const IconButton = ({ styles, name, size, color, onPress }) => {
  if (name === 'plus') {
    return (
      <TouchableOpacity style={styles} onPress={onPress}>
        <FontAwesome6 name="add" size={size} color={color} />
      </TouchableOpacity>
    );
  } else if (name === 'minus') {
    return (
      <TouchableOpacity style={styles} onPress={onPress}>
        <AntDesign name="minuscircleo" size={size} color={color} />
      </TouchableOpacity>
    );
  }
};

export default React.memo(IconButton);
