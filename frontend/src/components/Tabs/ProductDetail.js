import { useNavigation } from '@react-navigation/native';
import { ProductDetail } from '../ProductDetail';
import { DetailOptions } from '../icons/icons';
import { Stack } from '../common';

export const ProductDetailStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen name="ProductDetail" component={ProductDetail} options={DetailOptions({ navigation })} />
    </Stack.Navigator>
  );
};
