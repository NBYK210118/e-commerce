import { Image, StyleSheet, TouchableOpacity } from 'react-native';

export const Products = ({ data = [], handleMoveToProductDetail }) => {
  if (data !== undefined && data !== null && data.length > 0) {
    return (
      <>
        {data.map((val, idx) => (
          <TouchableOpacity key={idx} style={styles.box} onPress={() => handleMoveToProductDetail(val.id)}>
            <Image source={{ uri: val.images[0].imgUrl }} style={styles.img} />
          </TouchableOpacity>
        ))}
      </>
    );
  }
};

const styles = StyleSheet.create({
  box: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 5,
  },
  img: { width: 80, height: 80, borderRadius: 100 },
});
