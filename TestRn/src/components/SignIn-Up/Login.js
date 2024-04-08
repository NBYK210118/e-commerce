import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, verifyToken } from '../../features/auth/auth_thunk';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

export const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector((val) => val.userAuth.token);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    const data = { email, password };
    dispatch(signIn(data));
  };

  return (
    <View style={style.container}>
      <Image
        source={require('../../../assets/Original_Logo.png')}
        style={{
          width: 260,
          height: 190,
          borderRadius: 20,
          marginVertical: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
      />
      <View style={style.main}>
        <Text style={{ fontWeight: 'bold' }}>Email:</Text>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <TextInput
            onChangeText={setEmail}
            placeholder="이메일을 입력해주세요"
            style={{
              fontSize: 17,
              borderWidth: 1,
              borderColor: '#cfcfcf',
              borderRadius: 10,
              width: 250,
              paddingVertical: 10,
              paddingLeft: 5,
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 2.5,
            }}
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={style.main}>
        <Text style={{ fontWeight: 'bold' }}>Password:</Text>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <TextInput
            onChangeText={setPassword}
            secureTextEntry
            placeholder="비밀번호를 입력해주세요"
            style={{
              fontSize: 17,
              borderWidth: 1,
              borderColor: '#cfcfcf',
              borderRadius: 10,
              width: 250,
              paddingVertical: 10,
              paddingLeft: 5,
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 2.5,
            }}
          />
        </TouchableWithoutFeedback>
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          marginTop: 10,
          backgroundColor: '#507cf7',
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderRadius: 10,
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white' }}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: { display: 'flex', flexDirection: 'column', marginVertical: 10 },
});
