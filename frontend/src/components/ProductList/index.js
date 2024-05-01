import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Alert, Dimensions, FlatList, Image, Pressable, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedProduct } from '../../features/products/product_slice';
import { useCallback, useEffect, useState } from 'react';
import ProductApi from '../../services/product_api';
import { AntDesign } from '@expo/vector-icons';
import HorizontalCategory from '../MyPage/HorizontalCategory';
import DataService from '../../services/user_api';
import { BackButton, HomeButton } from '../icons/icons';

export const ProductList = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const { token, user } = useSelector((state) => state.userAuth);
  const { categories } = useSelector((state) => state.products);
  const [numColumns, setNumColumns] = useState(2);
  const [loading, setLoading] = useState(false);
  const [categoryStatus, setCategoryStatus] = useState({});

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

  const ProductItem = ({ item }) => {
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
        <Pressable style={{ backgroundColor: '#3CB371', padding: 4 }} onPress={() => handleAddToBasket(item.id)}>
          <AntDesign name="shoppingcart" size={18} color={'white'} style={{ textAlign: 'center' }} />
        </Pressable>
      </Pressable>
    );
  };

  return (
    <View>
      <HorizontalCategory categories={categories} categoryStatus={categoryStatus} onPress={handleCategoryChecked} />
      <FlatList
        data={products}
        key={String(numColumns)}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ProductItem item={item} />}
        numColumns={numColumns}
        style={{ padding: 20, paddingBottom: 40 }}
      />
    </View>
  );
};
