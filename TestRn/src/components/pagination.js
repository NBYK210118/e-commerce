import { StyleSheet, View } from 'react-native';

export const Pagination = ({ contents = [], current }) => {
  return (
    <>
      {contents.length > 0 && (
        <View style={styles.paginationContainer}>
          {contents.map((_, idx) => (
            <View key={idx} style={[styles.paginationDot, current === idx ? styles.activeDot : styles.inactiveDot]} />
          ))}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paginationDot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'blue',
  },
  inactiveDot: {
    backgroundColor: 'gray',
  },
});
