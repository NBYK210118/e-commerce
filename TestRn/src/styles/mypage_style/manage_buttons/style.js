import { StyleSheet } from 'react-native';

export const manage_btns_style = StyleSheet.create({
  one_row: {
    borderWidth: 1,
    borderColor: '#cfcfcf',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 10,
  },
  box: { display: 'flex', flexDirection: 'row' },
  img: { width: 60, height: 45, borderRadius: 4 },
  card_info: { display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  card_text: { fontSize: 11, marginVertical: 2, marginHorizontal: 15 },
  plus: {
    borderWidth: 1,
    borderColor: '#cfcfcf',
    borderRadius: 100,
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  icon: { fontSize: 28 },
  other_box: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
  other_text: { fontWeight: 'bold', fontSize: 15, marginLeft: 10 },
});
