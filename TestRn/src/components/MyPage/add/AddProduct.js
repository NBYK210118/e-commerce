import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import ImageUploadStep from './image_upload_step';
import { useCallback, useEffect, useState } from 'react';
import PriceDiscountStep from './price_step';
import { InventoryStep } from './InventoryStep';
import { Stepper } from './Stepper';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addProduct } from '../../../features/products/product_thunk';

export const AddProduct = () => {
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
  const [count, setCount] = useState('');
  const [detail, setDetail] = useState('');
  const [company, setCompany] = useState('');
  const [selectedItem, setSelectedItem] = useState('판매중');

  const content = [
    <ImageUploadStep
      image={image}
      setImage={setImage}
      name={name}
      setName={setName}
      category={category}
      setCategory={setCategory}
    />,
    <PriceDiscountStep
      productPrice={productPrice}
      setProductPrice={setProductPrice}
      discountPrice={discountPrice}
      setDiscountPrice={setDiscountPrice}
      discountRatio={discountRatio}
      setDiscountRatio={setDiscountRatio}
      isDiscount={isDiscount}
      setIsDiscount={setIsDiscount}
    />,
    <InventoryStep
      count={count}
      setCount={setCount}
      company={company}
      setCompany={setCompany}
      detail={detail}
      setDetail={setDetail}
      detailImgs={detailImgs}
      setDetailImgs={setDetailImgs}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
    />,
  ];

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

  const handleFinishBtn = (props) => {
    const data = {
      image,
      image_size: null,
      name,
      category,
      price: productPrice,
      manufacturer: company,
      detail,
      detail_files: detailImgs,
      inventory: count,
      isDiscounting: isDiscount,
      discountPrice,
      discountRatio,
      status: selectedItem,
      seller: user.profile.nickname,
    };
    try {
      dispatch(addProduct({ token, data }));
      navigation.navigate('My Page');
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

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: 10, paddingTop: 10 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={20}
      >
        <Stepper
          active={activeStep}
          content={content}
          onBack={handleBeforeBtn}
          onFinish={handleFinishBtn}
          onNext={handleNextBtn}
          stepStyle={styles.stepStyle}
          buttonStyle={styles.buttonStyle}
          buttonContainer={styles.buttonContainer}
          buttonTextStyle={styles.buttonTextStyle}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  stepStyle: {
    backgroundColor: 'lightblue',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    marginBottom: 10,
  },
  buttonStyle: { backgroundColor: '#38aeea', width: 100, paddingVertical: 10 },
  buttonTextStyle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
