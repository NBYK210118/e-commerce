import { AntDesign } from '@expo/vector-icons';
import { Image, Pressable, Text, View } from 'react-native';

export const ProductItem = ({ item, addToBasket, handleButton }) => {
  return (
    <Pressable
      style={{ flexDirection: 'column', width: 100, height: 150, marginRight: 20, marginBottom: 80 }}
      onPress={() => handleButton(item.id)}
    >
      <Image source={{ uri: item?.images[0]?.imgUrl }} style={{ width: 100, height: 120 }} />
      <Text style={{ fontWeight: 'bold', padding: 4 }}>{item?.name}</Text>
      <View style={{ flexDirection: 'row' }}>
        {item?.isDiscounting && <Text style={{ color: 'red', padding: 4 }}>{item?.discountRatio}%</Text>}
        <Text style={{ fontWeight: '500', padding: 4 }}>{item?.price.toLocaleString('ko-kr')}원</Text>
      </View>
      <Pressable style={{ backgroundColor: '#3CB371', padding: 4 }} onPress={() => addToBasket(item.id)}>
        <AntDesign name="shoppingcart" size={18} color={'white'} style={{ textAlign: 'center' }} />
      </Pressable>
    </Pressable>
  );
};
