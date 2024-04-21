import { Image } from 'react-native';

export const ImageViewer = ({ item, style }) => {
  if (item) {
    return <Image source={{ uri: item.images?.[0]?.imgUrl }} style={style} />;
  }
};
