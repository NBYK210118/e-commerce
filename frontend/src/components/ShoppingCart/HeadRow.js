import Checkbox from 'expo-checkbox';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const HeadRow = ({ count, onPress, value, onValueChange, removeMany }) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.left_btn} onPress={onPress}>
        <Checkbox value={value} onValueChange={onValueChange} style={styles.checkbox} />
        <Text style={styles.left_btn_txt}>
          전체 <Text style={styles.left_btn_count}>{count}</Text>개
        </Text>
      </TouchableOpacity>
      {value && (
        <TouchableOpacity style={styles.right_btn} onPress={removeMany}>
          <Text style={styles.right_btn_txt}>선택 삭제</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
  },
  checkbox: { padding: 4 },
  left_btn: { flexDirection: 'row', alignItems: 'center' },
  left_btn_txt: { marginLeft: 8 },
  left_btn_count: { padding: 5 },
  right_btn: { padding: 5 },
  right_btn_txt: { fontWeight: 'bold' },
});
