import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ProductApi from '../services/product_api';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { BackButton, HomeButton } from '../components/icons/icons';
import { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

export const useBasketHooks = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const { token, user } = useSelector((state) => state.userAuth);
  const { categories } = useSelector((state) => state.products);
  const [numColumns, setNumColumns] = useState(2);
  const [loading, setLoading] = useState(false);
  const [categoryStatus, setCategoryStatus] = useState({});

  const opacity = useSharedValue(0.5);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    if (!loading) {
      opacity.value = withTiming(1, { duration: 650 });
    } else {
      opacity.value = withRepeat(withTiming(0.4, { duration: 650 }), -1, true);
    }
  }, [loading, opacity]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HomeButton navigation={navigation} style={{ marginRight: 15 }} />,
      headerLeft: () => <BackButton navigation={navigation} style={{ marginLeft: 15 }} />,
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      const { categoryName } = route.params;
      if (categoryName) {
        ProductApi.getAllCategoryProducts(categoryName).then((response) => {
          setProducts(response.data);
        });

        const updateLayout = () => {
          const width = Dimensions.get('window').width;
          const itemWidth = 100;
          const newNumColumns = Math.floor(width / itemWidth);
          setNumColumns(newNumColumns);
        };

        Dimensions.addEventListener('change', updateLayout);
        updateLayout();
      }
    }, [route])
  );

  useEffect(() => {
    if (categories.length > 0) {
      setCategoryStatus(
        categories.reduce((acc, val) => {
          acc[val.name] = false;
          return acc;
        }, {})
      );
    }
  }, [categories]);

  const handleButton = (productId) => {
    dispatch(setSelectedProduct(productId));
    navigation.navigate('Product');
  };

  const handleAddToBasket = (productId) => {
    setLoading(true);
    ProductApi.addProductMyBasket(token, productId, navigation).then((response) => {
      if (response.data) {
        alert('장바구니에 성공적으로 추가되었습니다');
      }
    });
    setLoading(false);
  };

  const handleCategoryChecked = (category) => {
    if (category) {
      setCategoryStatus((prevState) => {
        let newState = { ...prevState };
        newState[category] = !categoryStatus[category];

        Object.keys(prevState).forEach((key) => {
          if (key !== category) newState[key] = false;
        });
        return newState;
      });
      ProductApi.getAllCategoryProducts(category).then((response) => {
        try {
          setProducts(response.data);
        } catch (error) {
          if (error.response !== undefined) {
            switch (error.response) {
              case 400:
                navigation.reset();
              case 401:
                navigation.navigate('Login');
              case 500:
                navigation.reset();
            }
          }
        }
      });
    }
  };

  return {
    products,
    loading,
    categories,
    numColumns,
    categoryStatus,
    handleAddToBasket,
    handleButton,
    handleCategoryChecked,
    animatedStyle,
  };
};
