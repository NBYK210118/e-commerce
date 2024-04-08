import { StyleSheet } from 'react-native';

export const hp_style = StyleSheet.create({
  container: {
    marginVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: { borderWidth: 1, borderColor: '#e3e3e3', borderRadius: 100, width: 100, height: 100 },
  user_info: {
    marginLeft: 10,
    marginTop: 10,
  },
  user_id: { marginBottom: 15, borderWidth: 1, borderColor: '#cfcfcf', borderRadius: 10, padding: 9 },
  user_nick: { borderWidth: 1, borderColor: '#cfcfcf', borderRadius: 10, padding: 9, paddingRight: 100 },
});
