import { Image, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { gray1, primary_gray } from '../../../styles/common/colors';

export const HeadProfile = () => {
  const user = useSelector((val) => val.userAuth.user);

  return (
    <View style={hp_style.container}>
      <View>
        <Image style={hp_style.img} source={{ uri: user ? user.profile.imageUrl : 'https://via.placeholder.com/50' }} />
      </View>
      <View style={{ flexDirection: 'column' }}>
        <View style={hp_style.user_info}>
          <Text style={hp_style.user_id}>유저 ID</Text>
          <Text style={hp_style.user_nick}>@{user ? user.email : 'UserId'}</Text>
        </View>
        <View style={hp_style.user_info}>
          <Text style={hp_style.user_id}>닉네임</Text>
          <Text style={hp_style.user_nick}>{user ? user.profile.nickname : 'UserName'}</Text>
        </View>
      </View>
    </View>
  );
};

const hp_style = StyleSheet.create({
  container: {
    marginVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: { borderWidth: 1, borderColor: gray1, borderRadius: 100, width: 100, height: 100 },
  user_info: {
    marginLeft: 10,
    marginTop: 10,
  },
  user_id: {
    color: 'gray',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  user_nick: {
    fontSize: 13,
  },
});
