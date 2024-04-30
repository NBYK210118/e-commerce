import { AntDesign } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { primary_gray } from '../../styles/common/colors';

export const BasketProduct = ({ item, idx, onCheck, status, onClose }) => {
  if (item !== undefined) {
    return (
      <>
        <View key={idx} style={styles.wrapper}>
          <Checkbox
            value={status[item.product.id]}
            onValueChange={() => onCheck(item.product.id)}
            style={styles.checkbox}
          />
          <Image source={{ uri: item.product.images[0].imgUrl }} style={styles.product_img} />
          <View style={styles.info}>
            <Text style={{ fontSize: 12, marginVertical: 2 }}>{item.product.manufacturer}</Text>
            <Text style={{ fontWeight: 'bold', marginVertical: 2 }} numberOfLines={1} ellipsizeMode="head">
              {item.product.name}
            </Text>
            <Text style={{ marginVertical: 2 }}>수량 {item.quantity}개</Text>
            <TouchableOpacity style={styles.touchInventory}>
              <Text style={styles.touchInventory_txt}>수량</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.side_wrapper}>
            <TouchableOpacity style={styles.close} onPress={() => onClose(item.product.id)}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={[item.product.isDiscounting && styles.ifdiscount, styles.price]}>
              {item.product.price.toLocaleString('ko-kr')}원
            </Text>
            {item.product.isDiscounting && (
              <Text style={styles.discount}>{item.product.discountPrice.toLocaleString('ko-kr')}원</Text>
            )}
          </View>
        </View>
      </>
    );
  } else return null;
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: { padding: 4 },
  product_img: { width: 85, height: 85, borderRadius: 50 },
  info: { flexDirection: 'column', marginLeft: -10, marginRight: 15 },
  touchInventory: { borderWidth: 1, borderRadius: 5, borderColor: primary_gray, padding: 5 },
  touchInventory_txt: { textAlign: 'center', marginVertical: 2 },
  side_wrapper: { flexDirection: 'column', justifyContent: 'space-around', marginTop: -15 },
  close: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20 },
  ifdiscount: {
    textDecorationLine: 'line-through',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'normal',
  },
  price: { fontWeight: 'bold' },
  discount: { fontWeight: 'bold' },
});
