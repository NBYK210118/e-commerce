import { StyleSheet, Text, View } from 'react-native';
import { primary_gray } from '../../styles/common/colors';

export const EmptyReviewList = () => {
  return (
    <View style={styles.wrapper}>
      <Text>작성된 후기가 없습니다.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: primary_gray,
    overflow: 'hidden',
    padding: 10,
    paddingVertical: 28,
    marginBottom: 10,
  },
});
