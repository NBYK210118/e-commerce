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
import { signIn } from '../../features/auth/auth_thunk';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loading = useSelector((state) => state.userAuth.loading);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    try {
      const data = { email, password };
      dispatch(signIn(data));

      if (!loading) {
        navigation.navigate('Home');
      }
    } catch (error) {
      setEmail('');
      setPassword('');
    }
  };

  const handleGoBefore = () => {
    navigation.navigate('Home');
  };
  const goSignup = () => {
    navigation.navigate('SignUp');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Image source={require('../../../assets/Original_Logo.png')} style={styles.logo} />

        <View style={styles.main}>
          <Text style={styles.label}>Email:</Text>

          <TextInput onChangeText={setEmail} placeholder="이메일을 입력해주세요" style={styles.inputs} />
        </View>

        <View style={styles.main}>
          <Text style={styles.label}>Password:</Text>

          <TextInput
            onChangeText={setPassword}
            secureTextEntry
            placeholder="비밀번호를 입력해주세요"
            style={styles.inputs}
          />
        </View>

        <View style={styles.login_signup_btn}>
          <TouchableOpacity onPress={handleSubmit} style={styles.login_btn}>
            <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white' }}>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goSignup} style={styles.signup_btn}>
            <Text style={styles.signup_btn_txt}>회원가입</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleGoBefore} style={styles.before_btn}>
          <Text style={styles.before_btn_text}>이전으로</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  main: { display: 'flex', flexDirection: 'column', marginVertical: 10 },
  logo: {
    width: 260,
    height: 190,
    borderRadius: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  label: { fontWeight: 'bold' },
  inputs: {
    fontSize: 17,
    borderWidth: 1,
    borderColor: '#cfcfcf',
    borderRadius: 10,
    width: 250,
    paddingVertical: 10,
    paddingLeft: 5,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
  },
  login_signup_btn: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 10,
  },
  login_btn: {
    marginTop: 10,
    backgroundColor: '#507cf7',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  before_btn: {
    position: 'absolute',
    bottom: 0,
    marginHorizontal: 20,
    paddingVertical: 18,
    width: '100%',
    backgroundColor: 'black',
  },
  before_btn_text: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  signup_btn: {
    marginVertical: 20,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: 'rgba(10,140,0,1)',
    borderRadius: 10,
  },
  signup_btn_txt: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'white',
  },
});
