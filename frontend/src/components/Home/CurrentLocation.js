import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export const CurrentLocation = ({ token, userInfo_loading, onPress, currentLocation }) => {
  return (
    <TouchableOpacity style={styles.header} onPress={onPress}>
      <FontAwesome name={token ? 'location-arrow' : 'sign-in'} size={20} color="black" style={{ marginRight: 7 }} />
      {token ? (
        <>
          <Text style={{ fontWeight: '500' }}>현재 배송지:</Text>
          <Text style={{ fontWeight: '200', color: 'black' }}>
            {currentLocation ? currentLocation : '불러오는 중...'}
          </Text>
        </>
      ) : (
        <Text>상품을 구매하시려면 로그인이 필요합니다</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingVertical: 5,
    backgroundColor: 'rgba(47, 218, 233, 0.32)',
  },
});
