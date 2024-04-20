import { useCallback, useEffect, useState } from 'react';
import { Dimensions, Image, View } from 'react-native';
import ProductApi from '../../services/product_api';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

export const ProductDetail = ({ route }) => {
  const [currentProduct, setCurrentProduct] = useState(null);
  const selectedProductId = useSelector((state) => state.products.selectedProductId);

  useFocusEffect(
    useCallback(() => {
      if (selectedProductId) {
        ProductApi.findProduct(selectedProductId).then((response) => {
          if (response.data) {
            console.log('response.data: ', response.data);
            setCurrentProduct(response.data);
          }
        });
      }
    }, [route])
  );

  return (
    <View>
      <ScrollView horizontal={true}>
        <Image source={{ uri: currentProduct.images?.[0]?.imgUrl }} width={400} height={400} />
      </ScrollView>
    </View>
  );
};
