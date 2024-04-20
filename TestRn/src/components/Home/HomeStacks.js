import { HomeScreen } from '.';
import { Stack } from '../common';
import { ProductDetail } from './ProductDetail';

export const HomeStacks = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeDetail" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
