import { Image } from 'react-native';

export const ImageViewer = ({ item, style, resizeMode }) => {
  if (item) {
    return <Image source={{ uri: item.images?.[0]?.imgUrl }} style={style} resizeMode={resizeMode} />;
  }
};
