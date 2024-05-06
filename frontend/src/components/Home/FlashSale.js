import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const initialProducts = [
  { id: 1, name: 'Product A', originalPrice: 50000, discountPrice: 33000, timeLeft: 172800 },
  { id: 2, name: 'Product B', originalPrice: 80000, discountPrice: 60000, timeLeft: 259200 },
  { id: 3, name: 'Product C', originalPrice: 212000, discountPrice: 150000, timeLeft: 432000 },
];

const formatTime = (seconds) => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${days}d ${hours}:${minutes}:${remainingSeconds}`;
};

export const TimeLimitedSales = () => {
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    const interval = setInterval(() => {
      setProducts((currentProducts) =>
        currentProducts.map((product) => {
          const newTimeLeft = Math.max(product.timeLeft - 1, 0);
          return { ...product, timeLeft: newTimeLeft };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const RenderProduct = ({ product }) => (
    <View style={styles.productContainer}>
      <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>
          {product.timeLeft > 0
            ? `${product.discountPrice.toLocaleString('ko-kr')}원`
            : `${product.originalPrice.toLocaleString('ko-kr')}원`}
        </Text>
        <Text style={styles.timeLeft}>{product.timeLeft > 0 ? formatTime(product.timeLeft) : 'Discount ended'}</Text>
      </View>
      <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.img} />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {products.map((product) => (
        <RenderProduct key={product.id} product={product} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#007BFF',
  },
  timeLeft: {
    fontSize: 14,
    color: '#FF6347',
  },
  img: {
    width: 100,
    height: 100,
  },
});
