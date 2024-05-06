import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import ImageUploadStep from './first_step';
import PriceDiscountStep from './mid_step';
import { InventoryStep } from './final_step';
import { Stepper } from './Stepper';
import { useAddProductState } from '../../../hooks/addProductState';

export const AddProduct = ({ route }) => {
  const {
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
  } = useAddProductState({ route });

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
      product_id={product_id}
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
