import { Image, ScrollView } from 'react-native';

export const ImageViewer = ({ item, style, resizeMode, onScroll }) => {
  if (item) {
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginLeft: 5 }}
        scrollEventThrottle={16}
        onScroll={onScroll}
        pagingEnabled
      >
        <Image source={{ uri: item.images?.[0]?.imgUrl }} style={style} resizeMode={resizeMode} />
      </ScrollView>
    );
  }
};
