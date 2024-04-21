import { Text } from 'react-native';

export const TextViewer = ({ item, style }) => {
  if (item) {
    return <Text style={style}>{item.name}</Text>;
  }
};
