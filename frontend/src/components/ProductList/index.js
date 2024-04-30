import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setSelectedProduct } from '../../features/products/product_slice';
import { useEffect } from 'react';
import ProductApi from '../../services/product_api';

export const ProductList = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const { categoryName } = route.params;
    if (categoryName) {
      console.log(categoryName);
      ProductApi.getAllProducts(categoryName).then((response) => {
        console.log('', response.data);
      });
    }
  }, [route]);

  const handleButton = () => {
    dispatch(setSelectedProduct(8));
    navigation.navigate('Product');
  };

  return (
    <View>
      <Pressable onPress={handleButton} style={{ padding: 5, backgroundColor: 'green' }}>
        <Text>버튼</Text>
      </Pressable>
    </View>
  );
};
