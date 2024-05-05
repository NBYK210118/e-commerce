import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const Products = ({ products, handleMoveToDetail }) => {
  if (products !== undefined && products.length > 0) {
    return (
      <>
        {products.map((val, idx) => (
          <TouchableOpacity key={idx} style={styles.box} onPress={() => handleMoveToDetail(val.id)}>
            <Image source={{ uri: val.images[0].imgUrl }} style={styles.img} />
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
              {val.name}
            </Text>

            <View style={styles.price_zone}>
              {val.isDiscounting && (
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.original_price}>
                  {val.price.toLocaleString('ko-kr')}원
                </Text>
              )}
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.discount_price}>
                {val.isDiscounting ? val.discountPrice.toLocaleString('ko-kr') : val.price.toLocaleString('ko-kr')}원
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </>
    );
  }
};

const styles = StyleSheet.create({
  box: {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    marginRight: 5,
  },
  img: { width: 120, height: 100 },
  name: { fontWeight: 'bold', textAlign: 'center' },
  price_zone: { display: 'flex', flexDirection: 'row' },
  original_price: { textDecorationLine: 'line-through', color: 'red', fontSize: 10 },
  discount_price: { textAlign: 'center', fontSize: 12, marginLeft: 2 },
});
