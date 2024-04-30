import { AntDesign } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';
import { primary_gray } from '../../styles/common/colors';

export const Review = ({ userReviewed, nickname, stars, txt, profileImg, reviewList }) => {
  if (!reviewList && userReviewed) {
    const wrapperStyle = {
      ...styles.wrapper,
      backgroundColor: '#e0efff',
    };
    return (
      <View style={wrapperStyle}>
        <View>
          <Image source={{ uri: userReviewed?.user?.profile?.imageUrl }} style={styles.image} />
        </View>
        <View style={styles.box}>
          <View style={styles.name_stars}>
            <Text style={styles.nickname}>{userReviewed?.user?.profile?.nickname}</Text>
            <View style={styles.stars_arrange}>
              {[...Array(userReviewed?.stars)].map((_, idx) => (
                <AntDesign key={idx} name="star" size={15} color="#f4cf0f" />
              ))}
            </View>
          </View>
          <Text numberOfLines={2} style={styles.review_txt}>
            {userReviewed?.txt}
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.wrapper}>
        <View>
          <Image source={{ uri: profileImg }} style={styles.image} />
        </View>
        <View style={styles.box}>
          <View style={styles.name_stars}>
            <Text style={styles.nickname}>{nickname ? nickname : '불러오는 중...'}</Text>
            <View style={styles.stars_arrange}>
              {[...Array(stars)].map((_, idx) => (
                <AntDesign key={idx} name="star" size={15} color="#f4cf0f" />
              ))}
            </View>
          </View>
          <Text numberOfLines={2} style={styles.review_txt}>
            {txt ? txt : '리뷰 텍스트'}
          </Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: primary_gray,
    overflow: 'hidden',
    padding: 10,
    paddingVertical: 28,
    marginBottom: 10,
  },
  image: { width: 60, height: 60, borderRadius: 100 },
  box: { marginLeft: 14, marginTop: 5 },
  name_stars: { flexDirection: 'row' },
  nickname: { marginBottom: 5, marginRight: 5, fontWeight: 'bold' },
  stars_arrange: { flexDirection: 'row', marginHorizontal: 5 },
  review_txt: { fontSize: 14, marginTop: 10 },
});
