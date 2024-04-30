import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

// 샘플 데이터
const initialSalesData = [
  { id: 1, name: '제품 A', timeLeft: 180 }, // 180초 남음
  { id: 2, name: '제품 B', timeLeft: 300 }, // 300초 남음
  { id: 3, name: '제품 C', timeLeft: 120 }, // 120초 남음
];

export const FlashSaleComponent = () => {
  const [sales, setSales] = useState(initialSalesData);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedSales = sales.map((sale) => {
        const newTimeLeft = Math.max(sale.timeLeft - 1, 0);
        return { ...sale, timeLeft: newTimeLeft };
      });
      setSales(updatedSales.filter((sale) => sale.timeLeft > 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [sales]);

  const RenderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemTimeLeft}>{item.timeLeft} seconds left</Text>
    </View>
  );

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {initialSalesData.map((item, idx) => (
        <RenderItem key={idx} item={item} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#f5f5f5',
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemTimeLeft: {
    fontSize: 16,
    color: 'red',
  },
});
