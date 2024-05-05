import { FontAwesome } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const Products = ({ data, onPress }) => {
  return (
    <>
      {data.map((val, idx) => (
        <TouchableOpacity key={idx} style={styles.box} onPress={() => handleMoveToProductDetail(val.id)}>
          <Image source={{ uri: val.images[0]?.imgUrl }} style={styles.img} />
          <View style={{ overflow: 'hidden', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.product_name}>
              {val.name}
            </Text>
            <Text style={{ color: 'gray', fontSize: 9 }}>
              <FontAwesome name="eye" size={12} color="black" />
              {val.viewed_count}
            </Text>
          </View>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.price}>
            {val.price.toLocaleString('ko-kr')}원
          </Text>
        </TouchableOpacity>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 5,
  },
  img: { width: 90, height: 100 },
  product_name: { fontWeight: 'bold', textAlign: 'center', marginRight: 2 },
  price: { textAlign: 'center' },
});
