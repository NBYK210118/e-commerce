import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import DataService from '../../../services/user_api';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';

const ITEM_HEIGHT = 100;

export const MyProducts = () => {
  const token = useSelector((val) => val.userAuth.token);
  const loading = useSelector((val) => val.products.loading);
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [currentLimit, setCurrentLimit] = useState(10);
  const [products, setProducts] = useState([]);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const scrollY = useSharedValue(0);

  useEffect(() => {
    if (token) {
      DataService.getSellinglist(token, currentLimit, navigation).then((response) => {
        if (response.data) {
          setProducts(response.data.sellinglist.products);
        }
      });
    } else {
      alert('로그인 인증 기한 만료');
      navigation.navigate('Login');
    }
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const AnimatedProductItem = ({ item, index, scrollY }) => {
    // 항목의 높이와 검색바에 의해 가려지는 시점을 계산
    const inputRange = [-1, 0, ITEM_HEIGHT * index, ITEM_HEIGHT * (index + 0.5)]; // index 번째 항목 기준 0.85만큼 내려왔을 때
    const outputRange = [1, 1, 1.3, 0.71]; // 가려지는 부분 시작, 가려지는

    const animatedStyle = useAnimatedStyle(() => {
      const opacity = interpolate(scrollY.value, inputRange, outputRange, Extrapolation.CLAMP);
      return { opacity };
    });

    return (
      <Animated.View style={[styles.productItem, animatedStyle]}>
        <View style={styles.productItem}>
          <Checkbox value={checked} onValueChange={setChecked} color={checked ? '#0ea5e9' : '#6366f1'} />
          <Image source={{ uri: item.images[0].imgUrl }} style={styles.productImage} />
          <View>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={{ fontSize: 12 }}>
              판매가:{' '}
              {item.isDiscount ? item.discountPrice.toLocaleString('ko-kr') : item.price.toLocaleString('ko-kr')}원 |
              재고: {item.inventory}
            </Text>
          </View>
          <View style={styles.managementButtons}>
            <TouchableOpacity style={[styles.button, styles.edit]}>
              <Text style={styles.btn_txt}>수정</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.update]}>
              <Text style={styles.btn_txt}>상태 변경</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <TextInput style={styles.searchInput} placeholder="상품 검색..." onChangeText={setKeyword} value={keyword} />
      <Animated.FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <AnimatedProductItem item={item} index={index} scrollY={scrollY} />}
        onScroll={scrollHandler}
      />
      {optionsVisible ? (
        <Animated.View>
          <TouchableOpacity style={[styles.bottom_Button, styles.cancel]}>
            <Text style={styles.addButtonText}>상품 판매취소</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bottom_Button, styles.add]}>
            <Text style={styles.addButtonText}>상품 추가</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bottom_Button, styles.sort_by_category]}>
            <Text style={styles.addButtonText}>카테고리별 정렬</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bottom_Button, styles.before]} onPress={() => setOptionsVisible(false)}>
            <Text style={styles.addButtonText}>이전으로</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <TouchableOpacity
          onPress={() => setOptionsVisible(!optionsVisible)}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
            backgroundColor: 'rgba(222, 222, 222, 0.66)',
          }}
        >
          <AntDesign name="caretleft" size={34} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
  },
  searchInput: {
    marginHorizontal: 10,
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  productItem: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 70,
    height: 70,
    marginHorizontal: 10,
  },
  productName: {
    fontWeight: 'bold',
  },
  managementButtons: {
    flexDirection: 'column',
    marginLeft: 'auto',
  },
  button: {
    marginVertical: 3,
    marginLeft: 10,
    padding: 7,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  edit: {
    backgroundColor: 'rgba(68, 194, 42, 0.95)',
  },

  update: { backgroundColor: 'rgba(42, 141, 234, 0.85)' },
  bottom_Button: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#0ea5e9',
    padding: 15,
    borderRadius: 30,
  },
  sort_by_category: {
    backgroundColor: 'rgba(234, 102, 42, 1)',
    bottom: 85,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancel: { backgroundColor: 'rgba(234, 211, 42, 1)', bottom: 150 },
  btn_txt: { fontSize: 14, textAlign: 'center', color: 'white' },
  before: {
    bottom: 210,
    backgroundColor: 'rgba(209, 209, 209, 1)',
  },
});
