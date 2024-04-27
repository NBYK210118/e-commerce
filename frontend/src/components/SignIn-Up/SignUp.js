import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MidStep } from './mid_step';
import { FinalStep } from './final_step';
import { FirstStep } from './first_step';
import { Stepper } from '../MyPage/manage/Stepper';
import DataService from '../../services/user_api';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../features/auth/auth_thunk';

export const SignUp = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, loading } = useSelector((state) => state.userAuth);
  const navigation = useNavigation();
  const content = [
    <FirstStep firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} />,
    <MidStep email={email} setEmail={setEmail} />,
    <FinalStep password={password} setPassword={setPassword} />,
  ];
  const [active, setActive] = useState(0);

  const handleNextBtn = () => {
    if (active === 0) {
      if (!firstName || !lastName) alert('필수 입력사항 입니다!');
      else setActive((prevState) => prevState + 1);
    } else if (active === 1) {
      if (!email) alert('필수 입력사항 입니다');
      else setActive((prevState) => prevState + 1);
    } else {
      if (!password) alert('필수 입력사항 입니다');
      else setActive((prevState) => prevState + 1);
    }
  };

  const handleBeforeBtn = () => {
    setActive((prevState) => prevState - 1);
  };

  const handleSubmitBtn = () => {
    const data = { firstName, lastName, email, password };
    dispatch(signUp({ data, navigation }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={{
            padding: 40,
            alignItems: 'center',
          }}
        >
          <ScrollView>
            <Stepper
              content={content}
              active={active}
              buttonContainer={styles.buttonContainer}
              buttonStyle={styles.buttonStyle}
              buttonTextStyle={styles.buttonTextStyle}
              onNext={handleNextBtn}
              onBack={handleBeforeBtn}
              onFinish={handleSubmitBtn}
            />
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.before_btn}>
        <Text style={styles.before_btn_text}>홈으로</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  before_btn: {
    position: 'absolute',
    bottom: 0,
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
  labelInput_txt: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    width: 250,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    marginBottom: 10,
  },
  buttonStyle: { backgroundColor: '#38aeea', width: 100, paddingVertical: 10 },
  buttonTextStyle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
