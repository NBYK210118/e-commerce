import { Image, Text, View } from 'react-native';
import { hp_style } from '../../../styles/mypage_style/head_profile/style';

export const HeadProfile = () => {
  return (
    <View style={hp_style.container}>
      <View>
        <Image style={hp_style.img} source={{ uri: 'https://via.placeholder.com/50' }} />
      </View>
      <View style={hp_style.user_info}>
        <Text style={hp_style.user_id}>UserId</Text>
        <Text style={hp_style.user_nick}>UserName</Text>
      </View>
    </View>
  );
};
