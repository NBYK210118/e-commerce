import { StyleSheet } from 'react-native';

export const mv_style = StyleSheet.create({
  content: {
    marginTop: 20,
    marginHorizontal: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  box: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 5,
  },
  img: { width: 90, height: 100 },
  product_name: { fontWeight: 'bold', textAlign: 'center' },
  price: { textAlign: 'center' },
});
