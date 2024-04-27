import { AntDesign } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { primary_blue } from '../../styles/common/colors';

export const FloatingBtns = ({ currentProduct, heart, onPress }) => {
  return (
    <View>
      <View style={styles.fixed_btns}>
        <Pressable style={styles.fixed_left_btn} onPress={onPress}>
          <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: 7 }}>
            <AntDesign
              name={`${currentProduct && heart[currentProduct.id] ? 'heart' : 'hearto'}`}
              size={20}
              color={`${currentProduct && heart[currentProduct.id] ? 'red' : 'black'}`}
            />
            {currentProduct && <Text style={{ fontSize: 14 }}>{currentProduct.likedBy.length}</Text>}
          </View>
        </Pressable>
        <Pressable style={styles.fixed_right_btn}>
          <Text style={{ fontSize: 20, color: 'white', paddingVertical: 15 }}>구매하기</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fixed_btns: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: '100%',
    marginLeft: -5,
    shadowRadius: 5,
    shadowColor: 'gray',
    shadowOpacity: 0.5,
  },
  fixed_left_btn: { width: '20%' },
  fixed_right_btn: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: primary_blue,
    borderRadius: 5,
  },
});
