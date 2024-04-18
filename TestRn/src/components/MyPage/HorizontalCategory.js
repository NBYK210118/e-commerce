import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { primary_gray } from '../../styles/common/colors';
import React from 'react';

export const HorizontalCategory = ({ categories = [], categoryStatus, onPress }) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      style={styles.container}
      contentContainerStyle={styles.wrapper}
    >
      {categories.length > 0 &&
        categories.map((category, idx) => (
          <TouchableOpacity
            key={`view-${idx}`}
            style={{
              borderRadius: 30,
              marginHorizontal: 5,
              borderWidth: 1,
              borderColor: primary_gray,
              backgroundColor: categoryStatus[category.name] ? 'rgba(0,0,0,0.1)' : 'white',
              height: 30,
            }}
            onPress={() => onPress(category.name)}
          >
            <Text
              key={idx}
              style={{
                lineHeight: 12,
                padding: 10,
                fontSize: 15,
                textAlign: 'center',
                fontWeight: '500',
                color: categoryStatus[category.name] ? 'rgba(20,100,230,1)' : 'black',
              }}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 5,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  wrapper: { justifyContent: 'space-around', alignItems: 'center' },
});

export default React.memo(HorizontalCategory);
