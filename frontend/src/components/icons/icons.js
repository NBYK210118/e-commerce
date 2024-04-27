import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export const AntIcon = ({ onPress, name, size, color, style }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <AntDesign name={name} size={size} color={color} style={style} />
    </TouchableOpacity>
  );
};

export const Material = ({ onPress, name, size, color, style }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialIcons name={name} size={size} color={color} style={style} />
    </TouchableOpacity>
  );
};
