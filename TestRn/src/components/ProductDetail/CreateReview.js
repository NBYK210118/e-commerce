import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import StarRating from './stars';
import { primary_gray } from '../../styles/common/colors';

export const CreateReview = ({ user, handlePostReview }) => {
  if (user !== undefined && user !== null) {
    return (
      <View style={styles.container}>
        <View>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.image} />
        </View>
        <View style={styles.detail}>
          <View style={styles.wrapper}>
            <Text style={styles.nickname}>{user ? user?.profile?.nickname : '로그인이 필요한 기능입니다'}</Text>
            <View style={styles.stars}>
              <StarRating />
            </View>
            <TouchableOpacity style={styles.post_btn} onPress={handlePostReview}>
              <Text style={styles.post_btn_txt}>게시</Text>
            </TouchableOpacity>
          </View>
          <TextInput multiline style={styles.input} placeholder="300자 이내로 작성해주세요." />
        </View>
      </View>
    );
  } else return null;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: primary_gray,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
    paddingVertical: 28,
    marginBottom: 10,
  },
  image: { width: 60, height: 60, borderRadius: 100 },
  detail: { marginLeft: 14, marginTop: 5 },
  wrapper: { flexDirection: user ? 'row' : 'column' },
  nickname: { marginBottom: 5, marginRight: 5, fontWeight: 'bold' },
  stars: { flexDirection: 'row', marginHorizontal: 5 },
  post_btn: {
    position: 'absolute',
    padding: 8,
    top: -5,
    right: 0,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: primary_blue,
  },
  post_btn_txt: { color: 'white' },
  input: {
    fontSize: 14,
    marginTop: 10,
    borderColor: primary_gray,
    borderWidth: 1,
    width: 250,
    height: 100,
    paddingLeft: 10,
  },
});
