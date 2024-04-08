import { Text, View } from 'react-native';
import { cart_style } from '../../styles/cart_style/cart_style';

export const ShoppingCart = () => {
  return (
    <View style={cart_style.content}>
      <Text>Shopping Cart</Text>
    </View>
  );
};
