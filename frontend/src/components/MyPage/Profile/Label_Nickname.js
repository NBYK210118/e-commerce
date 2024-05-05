import { StyleSheet, Text, View } from 'react-native';
import TextInputs from '../TextInputs';
import { primary_gray } from '../../../styles/common/colors';

export const LabelNickName = ({ user, nickname, setNickName }) => {
  return (
    <>
      <View style={styles.item_mb}>
        <Text style={styles.labels}>성</Text>
        <Text style={styles.email}>{user ? user.firstName : '유저 정보를 불러오지 못함'}</Text>
      </View>
      <View style={styles.item_mb}>
        <Text style={styles.labels}>이름</Text>
        <Text style={styles.email}>{user ? user.lastName : '유저 정보를 불러오지 못함'}</Text>
      </View>
      <View style={styles.item_mb}>
        <Text style={styles.labels}>ID</Text>
        <Text style={styles.email}>{user ? user.email : 'UserID'}</Text>
      </View>
      <View style={styles.item_mb}>
        <Text style={styles.labels}>닉네임</Text>
        <TextInputs value={nickname} onChangeText={setNickName} styles={styles.inputs} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  item_mb: { marginBottom: 12 },
  labels: { fontSize: 16, marginBottom: 5, fontWeight: 'bold' },
  email: {
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: primary_gray,
    borderRadius: 5,
    padding: 5,
  },
  inputs: {
    backgroundColor: 'white',
    fontSize: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: primary_gray,
    borderRadius: 5,
    padding: 5,
  },
});
