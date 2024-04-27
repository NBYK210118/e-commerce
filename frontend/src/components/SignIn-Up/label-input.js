import React from "react";
import { Keyboard, Text, TextInput, View } from "react-native";

export const LabelInput = ({
  label,
  value,
  onChangeText,
  textStyle,
  itemStyle,
  labelStyle,
  placeholder,
  secure = false,
}) => {
  return (
    <View style={itemStyle}>
      <Text style={labelStyle}>{label ? label : "None"}: </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={textStyle}
        secureTextEntry={secure}
      />
    </View>
  );
};

export default React.memo(LabelInput);
