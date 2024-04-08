import { StyleSheet } from 'react-native';

export const rc_style = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  header_username: { color: '#0067a3' },
  box: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 5,
  },
  img: { width: 80, height: 80, borderRadius: 100 },
});
