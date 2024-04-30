import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { primary_gray } from '../../styles/common/colors';
import { AntDesign, Feather } from '@expo/vector-icons';

export const HeartBasket = ({ currentProduct, heart, onPress, onPressBasket }) => {
  if (currentProduct) {
    return (
      <View style={styles.btn_row}>
        <View style={styles.basket_wrap}>
          <TouchableOpacity style={styles.basket_btn} onPress={onPressBasket}>
            <Feather name="shopping-bag" size={24} color="black" style={{ marginRight: 5 }} />
            <Text>장바구니 담기</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.like_btn} onPress={onPress}>
            <AntDesign
              name={`${heart[currentProduct.id] ? 'heart' : 'hearto'}`}
              size={24}
              color={`${heart[currentProduct.id] ? 'red' : 'black'}`}
              style={styles.heart}
            />
            <Text>좋아요</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  btn_row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  basket_wrap: { marginRight: 20 },
  basket_btn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: primary_gray,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  heart: { marginRight: 5 },
  like_btn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: primary_gray,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
