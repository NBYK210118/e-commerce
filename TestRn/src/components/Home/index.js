import { Image, ScrollView, Text, View } from 'react-native';
import { Categories } from '../categories/category';
import { home_style } from '../../styles/home_styles/home';
import { RecommendProducts } from './recommend';
import { MostViewedProducts } from './mostViewed';
import { DiscountProducts } from './discount';

export const HomeScreen = () => {
  return (
    <ScrollView style={home_style.wrapper}>
      <Categories />
      <RecommendProducts />
      <MostViewedProducts />
      <DiscountProducts />
    </ScrollView>
  );
};
