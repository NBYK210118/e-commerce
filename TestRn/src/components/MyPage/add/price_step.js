import React, { useRef, useState } from 'react';
import { StyleSheet, Switch, Text, TextInput, View } from 'react-native';

export const PriceDiscountStep = ({
  productPrice,
  setProductPrice,
  discountPrice,
  setDiscountPrice,
  discountRatio,
  setDiscountRatio,
  isDiscount,
  setIsDiscount,
}) => {
  const priceInputRef = useRef();
  const discountPriceRef = useRef();

  const tempConvertPrice = (value) => {
    const price = Number(value.split(',').join(''));
    return price;
  };

  const handlePrice = (e) => {
    let price = e;
    price = Number(price.replaceAll(',', ''));
    if (isNaN(price)) {
      priceInputRef.current.value = 0;
    } else {
      const formatValue = price.toLocaleString('ko-kr');
      priceInputRef.current.value = formatValue;
      setProductPrice(formatValue);
    }
  };

  const handleDiscountPrice = (val) => {
    const origin_price = tempConvertPrice(productPrice);
    const discount_price = tempConvertPrice(val);
    const rate = ((origin_price - discount_price) / origin_price) * 100;

    let price = val;
    price = Number(price.replaceAll(',', ''));
    if (isNaN(price)) {
      discountPriceRef.current.value = 0;
    } else {
      const formatValue = price.toLocaleString('ko-kr');
      discountPriceRef.current.value = formatValue;
      setDiscountPrice(formatValue);
    }
    setDiscountRatio(rate.toFixed(0));
  };

  const handleDiscountRatio = (val) => {
    const ratio = Number(val) / 100;
    const temp = tempConvertPrice(productPrice);

    if (ratio >= 0 && ratio <= 99) {
      const result = temp - temp * ratio.toFixed(1);
      const formatValue = result.toLocaleString('ko-kr');
      discountPriceRef.current.value = formatValue;
      setDiscountRatio(val);
      setDiscountPrice(formatValue);
    } else {
      alert('할인율은 1%~99% 까지 설정할 수 있습니다');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20 }}>
        <Text style={styles.label}>가격: </Text>
        <TextInput
          ref={priceInputRef}
          style={styles.input}
          value={productPrice}
          onChangeText={handlePrice}
          placeholder="가격 입력"
          keyboardType="numeric"
        />
        <Text style={styles.label}>원</Text>
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>할인 여부:</Text>
        <Switch value={isDiscount} onValueChange={setIsDiscount} />
      </View>
      {isDiscount && (
        <>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20 }}
          >
            <Text style={styles.label}>할인가:</Text>
            <TextInput
              ref={discountPriceRef}
              style={[styles.input, { marginBottom: 10 }]}
              value={discountPrice}
              onChangeText={handleDiscountPrice}
              placeholder="할인가 입력"
              keyboardType="numeric"
            />
            <Text style={styles.label}>원</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20 }}
          >
            <Text style={styles.label}>할인율:</Text>
            <TextInput
              style={styles.input}
              value={discountRatio}
              onChangeText={handleDiscountRatio}
              placeholder="할인율 입력"
              keyboardType="numeric"
            />
            <Text style={styles.label}>%</Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  input: {
    width: 200,
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
});

export default React.memo(PriceDiscountStep);
