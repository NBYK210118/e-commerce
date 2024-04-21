import { useCallback, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import ProductApi from '../../services/product_api';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { ImageViewer } from './ImageViewer';
import { ProductName, TextViewer } from './TextViewer';
import { AntIcon } from '../icons/icons';

export const ProductDetail = ({ route }) => {
  const [currentProduct, setCurrentProduct] = useState(null);
  const selectedProductId = useSelector((state) => state.products.selectedProductId);

  useFocusEffect(
    useCallback(() => {
      if (selectedProductId) {
        ProductApi.findProduct(selectedProductId).then((response) => {
          if (response.data) {
            setCurrentProduct(response.data);
          }
        });
      }
    }, [route])
  );

  return (
    <View style={{ paddingVertical: 20 }}>
      <ScrollView horizontal={true}>
        <ImageViewer item={currentProduct} style={{ width: Dimensions.get('window').width, height: 300 }} />
      </ScrollView>
      <View style={{ marginLeft: 15 }}>
        <Text style={{ paddingVertical: 20, color: 'gray' }}>{currentProduct && currentProduct.category_name}</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 25 }}>
          {currentProduct && currentProduct.name}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
            {[...Array(5)].map((_, idx) => (
              <AntIcon key={idx} name={'star'} size={20} color={'#f4cf0f'} />
            ))}
          </View>
          <View style={{ marginTop: 2, marginRight: 10 }}>
            <Text style={{ color: 'gray' }}>4.8</Text>
          </View>
          <View style={{ marginTop: 2 }}>
            <Text style={{ color: '#0096FF', fontWeight: '800' }}>후기 532개</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
