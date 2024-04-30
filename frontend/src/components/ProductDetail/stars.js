import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const StarRating = ({ rating, setRating }) => {
  const onStarPress = (newRating) => {
    setRating(newRating);
  };

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => onStarPress(i)}>
          <AntDesign name={i <= rating ? 'star' : 'staro'} size={32} color={i <= rating ? '#f4cf0f' : 'gray'} />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return <View style={styles.container}>{renderStars()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StarRating;
