import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable,
  TextInput,
  FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';
import { primary_blue, primary_gray } from '../../styles/common/colors';
import ProductApi from '../../services/product_api';
import Checkbox from 'expo-checkbox';
import { AntDesign } from '@expo/vector-icons';
import { BasketProduct } from './BasketProduct';
import { HeadRow } from './HeadRow';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { InventoryModal } from './inventory_modal';
import { PayInfo } from './PayInfo';
import { PayInfoSkeleton } from './PayInfoSkeleton';

export const ShoppingCart = () => {
  const [products, setProducts] = useState([]);
  const [currentProductId, setCurrentProductId] = useState(0);
  const [productSummary, setProductSummary] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [inventoryStatus, setInventoryStatus] = useState({});
  const [entireCheck, setEntireCheck] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { token, user } = useSelector((state) => state.userAuth);
  const navigation = useNavigation();
  const opacity = useSharedValue(0.5);
  const [loading, setLoading] = useState(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    if (!loading) {
      opacity.value = withTiming(0, { duration: 1000 });
    } else {
      opacity.value = withRepeat(withTiming(0.3, { duration: 1000 }), -1, true);
    }
  }, [loading, opacity, navigation]);

  useFocusEffect(
    useCallback(() => {
      if (!token) {
        alert('로그인이 필요합니다');
        navigation.navigate('Login');
      } else {
        setLoading(true);
        ProductApi.getMyBasket(token).then((response) => {
          setProducts(response.data.products);
          setProductSummary(response.data.summary);
          setLoading(false);
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
      setInventoryStatus(
        products.reduce((acc, val) => {
          acc[val.product.id] = val.quantity;
          return acc;
        }, {})
      );
    }
  }, [products]);

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

  const handleModal = (productId) => {
    setQuantity(inventoryStatus[productId]);
    setCurrentProductId(productId);
    setModalOpen(!modalOpen);
  };

  const handleInventories = (sign) => {
    if (sign === '+') {
      setQuantity(quantity + 1);
    } else if (quantity > 0 && sign === '-') {
      setQuantity(quantity - 1);
    }
  };

  const submitInventoryChanges = () => {
    ProductApi.updateProductQuantity(token, currentProductId, quantity).then((response) => {
      setProducts(response.data.products);
      setProductSummary(response.data.summary);
    });
    setModalOpen(false);
  };

  return (
    <Animated.ScrollView style={styles.container}>
      <InventoryModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        quantity={quantity}
        setQuantity={setQuantity}
        onSubmitChange={submitInventoryChanges}
        touchSign={handleInventories}
      />
      <HeadRow
        count={products.length}
        value={entireCheck}
        onValueChange={checkEntire}
        onPress={checkEntire}
        removeMany={removeManyProducts}
      />
      {products.length > 0 &&
        products.map((item, index) => (
          <View style={styles.items} key={index}>
            <BasketProduct
              item={item}
              key={index}
              idx={index}
              status={selectedProducts}
              onCheck={toggleCheckBox}
              onClose={toggleClose}
              handleModal={handleModal}
            />
          </View>
        ))}
      {loading ? (
        <PayInfoSkeleton loadingStyle={animatedStyle} />
      ) : (
        <PayInfo productSummary={productSummary} productCount={products.length} />
      )}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 30,
    backgroundColor: 'rgba(236, 240, 241,1)',
  },
  items: { padding: 15, backgroundColor: 'white', marginVertical: 9 },
});
