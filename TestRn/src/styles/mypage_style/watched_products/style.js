import { StyleSheet } from 'react-native';

export const wp_style = StyleSheet.create({
  container: { display: 'flex', flexDirection: 'column', marginVertical: 20 },
  header: { fontSize: 19, fontWeight: 'bold', marginBottom: 10 },
  wrapper: { display: 'flex', flexDirection: 'row' },
  boxes: { display: 'flex', flexDirection: 'row' },
  box: { display: 'flex', flexDirection: 'column', marginRight: 4 },
  img: { borderWidth: 1, borderColor: '#cfcfcf', width: 95, height: 120 },
  name: { fontWeight: 'bold' },
});
