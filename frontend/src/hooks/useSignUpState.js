import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useSignUpState = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, loading } = useSelector((state) => state.userAuth);
  const navigation = useNavigation();
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

  return {
    firstName,
    lastName,
    email,
    password,
    error,
    loading,
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    handleBeforeBtn,
    handleSubmitBtn,
    handleNextBtn,
  };
};
