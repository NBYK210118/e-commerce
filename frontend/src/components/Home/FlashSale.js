import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Sample data with time in seconds (e.g., 2 days = 172800 seconds)
const initialProducts = [
  { id: 1, name: 'Product A', originalPrice: 50, discountPrice: 30, timeLeft: 172800 }, // 2 days
  { id: 2, name: 'Product B', originalPrice: 80, discountPrice: 60, timeLeft: 259200 }, // 3 days
  { id: 3, name: 'Product C', originalPrice: 20, discountPrice: 15, timeLeft: 432000 }, // 5 days
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
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>
        {product.timeLeft > 0 ? `₩${product.discountPrice}` : `₩${product.originalPrice}`}
      </Text>
      <Text style={styles.timeLeft}>{product.timeLeft > 0 ? formatTime(product.timeLeft) : 'Discount ended'}</Text>
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
});
