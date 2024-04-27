import React from 'react';
import { TextInput } from 'react-native';

export const TextInputs = ({ key, value, onChangeText, styles }) => {
  if (key) {
    return <TextInput key={key} value={value} onChangeText={onChangeText} style={styles} />;
  } else {
    return <TextInput value={value} onChangeText={onChangeText} style={styles} />;
  }
};

export default React.memo(TextInputs);
