import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';

export const ShoppingCart = () => {
  const token = useSelector((val) => val.userAuth.token);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      if (!token) {
        navigation.navigate('Login');
      }
    }, [token, navigation])
  );

  return (
    <View style={cart_style.content}>
      <Text>Shopping Cart</Text>
    </View>
  );
};

const cart_style = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
