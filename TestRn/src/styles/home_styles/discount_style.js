import { StyleSheet } from 'react-native';

export const discount_style = StyleSheet.create({
  container: {
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
  img: { width: 120, height: 100 },
  name: { fontWeight: 'bold', textAlign: 'center' },
  price_zone: { display: 'flex', flexDirection: 'row' },
  original_price: { textDecorationLine: 'line-through', color: 'red', fontSize: 10 },
  discount_price: { textAlign: 'center', fontSize: 12, marginLeft: 2 },
});
