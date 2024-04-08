import { Image, ScrollView, Text, View } from 'react-native';
import { rc_style } from '../../../styles/home_styles/recommend_style';

export const RecommendProducts = () => {
  return (
    <View style={rc_style.container}>
      <Text style={rc_style.header}>
        <Text style={rc_style.header_username}>회원님</Text> 추천 상품
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={16}>
        {[...Array(7)].map((_, idx) => (
          <View key={idx} style={rc_style.box}>
            <Image source={{ uri: 'http://via.placeholder.com/50' }} style={rc_style.img} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
