import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const useProfileHooks = () => {
  const user = useSelector((val) => val.userAuth.user);
  const token = useSelector((val) => val.userAuth.token);
  const origin_address = useSelector((val) => val.userAuth.address);
  const [selectedImg, setSelectedImg] = useState('');
  const [company, setCompany] = useState('');
  const [nickname, setNickName] = useState('');
  const [registeredAddress, setRegisteredAddress] = useState([]);
  const [address, setAddress] = useState([]);
  const [phoneNumber, setPhone] = useState('');
  const [currentWilling, setCurrentWilling] = useState(false);
  const [personalOrCompany, setPersonalOrCompany] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState('');
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      if (!token) {
        alert('로그인이 필요합니다');
        navigation.navigate('Login');
      }
    }, [token, navigation])
  );

  useEffect(() => {
    if (token && user) {
      setSelectedImg(user.profile.imageUrl);
      setNickName(user.profile.nickname);
      setCurrentWilling(user.seller);
      if (user.profile.address.length > 0) {
        const newAddresses = [...new Set([...user.profile.address, origin_address].filter(Boolean))];

        // 기존 등록된 주소와 중복되지 않는 주소만 추가
        setRegisteredAddress((prevState) => {
          const existingAddresses = new Set(prevState);
          const filteredAddresses = newAddresses.filter((addr) => !existingAddresses.has(addr));
          return [...prevState, ...filteredAddresses];
        });
      }

      if (user.store) {
        setPersonalOrCompany(false);
        setCompany(user.store.name);
      }
      if (user.profile.phoneNumber) {
        setPhone(user.profile.phoneNumber);
      }
    }
  }, []);

  useEffect(() => {
    if (user && user.profile.currentAddress) {
      setSelectedAddress(user.profile.currentAddress);
    }
  }, [user]);

  const handleSubmit = () => {
    if (token) {
      const data = {
        imgUrl: selectedImg,
        store: company,
        nickname,
        address: registeredAddress,
        phoneNumber,
        seller: currentWilling,
        isPersonal: personalOrCompany,
        currentAddr: selectedAddress,
        userCurrentLocation: origin_address,
      };
      onSubmit(data);
    }
  };

  const addToList = (index) => {
    setRegisteredAddress((prevState) => {
      if (prevState.length < 6) {
        const newAddresses = address.filter((val, idx) => !prevState.includes(val) && val != '' && idx === index);
        return [...prevState].concat(newAddresses);
      } else {
        console.log('등록된 주소가 5개입니다');
      }
    });
    setAddress([]);
  };

  const removeInList = (index) => {
    setAddress((prevState) => prevState.filter((val, idx) => idx !== index));
  };

  const handleSelectAddress = useCallback(
    (val) => {
      if (val !== selectedAddress) {
        setSelectedAddress(val);
      }
    },
    [selectedAddress]
  );

  const createAddressBlank = useCallback(() => {
    setAddress([...address, '']);
  }, [address]);

  const removeRegisteredAddress = (index) => {
    setRegisteredAddress((prevState) => prevState.filter((val, idx) => idx != selectedAddress));
  };

  const updateInput = (text, index) => {
    const newInputs = address.slice();
    newInputs[index] = text;
    setAddress(newInputs);
  };
  return {
    user,
    token,
    origin_address,
    selectedAddress,
    selectedImg,
    personalOrCompany,
    setAddress,
    setCompany,
    setCurrentWilling,
    setNickName,
    setPersonalOrCompany,
    setPhone,
    setSelectedImg,
    handleSubmit,
    handleSelectAddress,
    addToList,
    createAddressBlank,
    removeInList,
    removeRegisteredAddress,
    updateInput,
    nickname,
    phoneNumber,
    registeredAddress,
    address,
    currentWilling,
  };
};
