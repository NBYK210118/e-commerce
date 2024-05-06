import { ShoppingCart } from '../ShoppingCart';
import { Stack } from '../common';

export const ShoppingCartStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyShoppingCart" component={ShoppingCart} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
