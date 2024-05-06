import { FontAwesome } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { primary_blue, primary_gray } from '../../styles/common/colors';

export const AnimatedBottomButton = ({ modalStyle, productSummary }) => {
  return (
    <Animated.View style={[styles.pay_wrapper, modalStyle]}>
      <TouchableOpacity style={styles.watch_more}>
        <FontAwesome name="hand-o-left" size={24} color="black" />
        <Text style={styles.watch_more_txt}>상품 더 보기</Text>
      </TouchableOpacity>
      <Pressable style={styles.pay_wrap}>
        <Text style={styles.pay_btn_txt}>결제하기</Text>
        <Text style={styles.how_much}>{productSummary?.finalPay.toLocaleString('ko-kr')}원</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  pay_wrapper: {
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    bottom: -100,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: 'gray',
    shadowRadius: 10,
    shadowOpacity: 0.6,
    padding: 15,
  },
  watch_more: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: primary_gray,
    borderRadius: 10,
    padding: 10,
    shadowRadius: 10,
    shadowColor: primary_gray,
  },
  watch_more_txt: { marginLeft: 10 },
  pay_wrap: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    paddingHorizontal: 35,
    backgroundColor: primary_blue,
    borderRadius: 10,
  },
  pay_btn_txt: { color: 'white', fontWeight: 'bold', fontSize: 19, textAlign: 'center', marginBottom: 5 },
  how_much: { color: 'white', fontWeight: 'bold', fontSize: 14 },
});
