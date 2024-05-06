import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductApi from '../services/product_api';
import { addProduct, updateProduct } from '../features/products/product_thunk';

export const useAddProductState = ({ route }) => {
  const product_id = route.params?.product_id;
  const token = useSelector((state) => state.userAuth.token);
  const user = useSelector((state) => state.userAuth.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const [category, setCategory] = useState(null);
  const [isDiscount, setIsDiscount] = useState(false);
  const [productPrice, setProductPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [discountRatio, setDiscountRatio] = useState('');
  const [detailImgs, setDetailImgs] = useState([]);
  const [count, setCount] = useState(0);
  const [detail, setDetail] = useState('');
  const [company, setCompany] = useState('');
  const [selectedItem, setSelectedItem] = useState('판매중');

  useEffect(() => {
    if (product_id) {
      ProductApi.findProduct(product_id).then((response) => {
        if (response.data) {
          const data = response.data;
          setCategory(data.category_name);
          setImage(data.images[0].imgUrl);
          setIsDiscount(data.isDiscounting);
          setName(data.name);
          setCount(data.inventory);
          setDiscountPrice(data.discountPrice.toLocaleString('ko-kr'));
          setDiscountRatio(data.discountRatio.toLocaleString('ko-kr'));
          setCompany(data.manufacturer);
          setProductPrice(data.price.toLocaleString('ko-kr'));
          setDetailImgs(data.detailImgs);
          setDetail(data.description[0]);
        }
      });
    }
  }, []);

  const handleBeforeBtn = () => {
    setActiveStep((p) => p - 1);
  };

  const handleNextBtn = () => {
    if (!image || !name || !category) {
      alert('모든 필드를 입력해야 합니다. 이미지, 상품명, 카테고리를 확인해주세요.');
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleFinishBtn = () => {
    const data = {
      image,
      image_size: null,
      name,
      category,
      price: productPrice,
      manufacturer: company,
      detail,
      detailImgs,
      inventory: count,
      isDiscounting: isDiscount,
      discountPrice,
      discountRatio,
      status: selectedItem,
      seller: user.profile.nickname,
    };
    try {
      if (!product_id) {
        dispatch(addProduct({ token, data }));
        navigation.navigate('My Page');
      } else {
        dispatch(updateProduct({ token, data, id: product_id }));
        navigation.navigate('My Page');
      }
    } catch (error) {
      if (error.response !== undefined) {
        switch (error.response.status) {
          case 400:
            alert('잘못된 요청');
          case 401:
            alert('권한 없음');
          case 500:
            alert('서버 에러');
        }
      }
    }
  };

  return {
    token,
    user,
    navigation,
    dispatch,
    activeStep,
    image,
    name,
    category,
    isDiscount,
    productPrice,
    discountPrice,
    discountRatio,
    detailImgs,
    count,
    detail,
    company,
    selectedItem,
    handleBeforeBtn,
    handleNextBtn,
    handleFinishBtn,
  };
};
