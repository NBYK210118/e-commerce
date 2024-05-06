import { useCallback, useEffect, useState } from 'react';
import ProductApi from '../services/product_api';
import { useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export const useBasketHooks = () => {
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
  const scrollY = useSharedValue(0);
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

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const modalStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withTiming(scrollY.value > 10 ? -105 : 0, { duration: 800 }) }],
    };
  }, [scrollY]);

  return {
    loading,
    modalOpen,
    setModalOpen,
    quantity,
    setQuantity,
    products,
    entireCheck,
    selectedProducts,
    productSummary,
    modalStyle,
    handleScroll,
    submitInventoryChanges,
    handleInventories,
    handleModal,
    removeManyProducts,
    toggleCheckBox,
    toggleClose,
    checkEntire,
    animatedStyle,
  };
};
