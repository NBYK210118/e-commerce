import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { primary_gray } from '../../styles/common/colors';
import ProductApi from '../../services/product_api';
import Checkbox from 'expo-checkbox';
import { AntDesign } from '@expo/vector-icons';
import { BasketProduct } from './BasketProduct';
import { HeadRow } from './HeadRow';

export const ShoppingCart = () => {
  const [products, setProducts] = useState([]);
  const [productSummary, setProductSummary] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [entireCheck, setEntireCheck] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { token, user } = useSelector((state) => state.userAuth);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      if (!token) {
        alert('로그인이 필요합니다');
        navigation.navigate('Login');
      } else {
        ProductApi.getMyBasket(token).then((response) => {
          setProducts(response.data.products);
          setProductSummary(response.data.summary);
        });
      }
    }, [token, navigation])
  );

  useEffect(() => {
    if (products.length > 0) {
      setSelectedProducts(
        products.reduce((acc, val) => {
          acc[val.product.id] = true;
          return acc;
        }, {})
      );
    }
  }, [products]);

  useEffect(() => {
    console.log('selectedProducts: ', selectedProducts);
  }, [selectedProducts]);

  const toggleCheckBox = (productId) => {
    const data = {
      ...selectedProducts,
      [productId]: !selectedProducts[productId],
    };
    setSelectedProducts(() => {
      const condition = Object.values(data).every((val) => val === true);
      if (condition) setEntireCheck(true);
      else setEntireCheck(false);
      return data;
    });
  };

  const checkEntire = () => {
    const keys = Object.keys(selectedProducts);
    setSelectedProducts((prevState) => {
      const newState = { ...prevState };
      for (const key of keys) {
        newState[key] = !entireCheck;
      }
      return newState;
    });
    setEntireCheck(!entireCheck);
  };

  const toggleClose = (productId) => {
    ProductApi.removeProductBasket(token, productId).then((response) => {
      setProducts(response.data.products);
      setProductSummary(response.data.summary);
    });
  };

  const removeManyProducts = () => {
    ProductApi.removeManyProductInBasket(token, selectedProducts).then((response) => {
      setProducts(response.data.products);
      setProductSummary(response.data.summary);
    });
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalOpen(!modalOpen);
        }}
      ></Modal>
      <ScrollView style={styles.container}>
        <HeadRow
          count={products.length}
          value={entireCheck}
          onValueChange={checkEntire}
          onPress={checkEntire}
          removeMany={removeManyProducts}
        />
        <View style={styles.items}>
          {products.map((item, idx) => (
            <BasketProduct
              item={item}
              idx={idx}
              status={selectedProducts}
              onCheck={toggleCheckBox}
              onClose={toggleClose}
            />
          ))}
        </View>
        <View style={{ padding: 10, backgroundColor: 'white' }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
            결제할 상품 <Text style={{ color: 'gray', fontWeight: '600' }}>총 {products.length}개</Text>
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
            <Text>상품 금액</Text>
            <Text style={{ fontWeight: 'bold' }}>376,600원</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25, marginVertical: 10 }}>
            <Text>할인된 금액</Text>
            <Text style={{ fontWeight: 'bold' }}>-81,375원</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25, marginVertical: 10 }}>
            <Text>결제 금액</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 24 }}>295,225원</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#e1e1e1',
  },
  items: { padding: 15, backgroundColor: 'white', marginVertical: 9 },
});
