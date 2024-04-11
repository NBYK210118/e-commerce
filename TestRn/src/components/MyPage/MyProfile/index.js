import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RadioButtonGroup, { RadioButtonItem } from 'expo-radio-button';
import { useSelector, useDispatch } from 'react-redux';

export const MyProfile = ({ onChange }) => {
  const user = useSelector((val) => val.userAuth.user);
  const token = useSelector((val) => val.userAuth.token);
  const origin_address = useSelector((val) => val.userAuth.address);
  const [selectedImg, setSelectedImg] = useState('');
  const [company, setCompany] = useState('');
  const [nickname, setNickName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [currentWilling, setCurrentWilling] = useState('no');
  const [personalOrCompany, setPersonalOrCompany] = useState('personal');

  const handleSubmit = () => {};

  useEffect(() => {
    if (token) {
      if (user) {
        setSelectedImg(user.profile.imageUrl);
        setNickName(user.profile.nickname);
        setAddress(origin_address);
        if (user.profile.store) {
          setCompany(user.profile.store?.name);
          setPersonalOrCompany('company');
        }
        if (user.profile.phoneNumber) {
          setPhone(user.profile.phoneNumber);
        }
      }
    }
  }, []);

  return (
    <View
      style={{
        marginVertical: 10,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false} style={{ flexDirection: 'column', marginHorizontal: 20 }}>
        <View style={{ marginVertical: 10 }}>
          <TouchableOpacity
            style={{
              width: 240,
              height: 120,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 45,
            }}
            onPress={() => onChange({ setSelectedImg })}
          >
            <Image
              style={{ width: 120, height: 120, borderWidth: 1, borderColor: '#cfcfcf', borderRadius: 100 }}
              source={{ uri: selectedImg ? selectedImg : 'https://via.placeholder.com/120' }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>ID</Text>
          <Text style={{ borderWidth: 1, borderColor: '#cfcfcf', borderRadius: 5, padding: 5 }}>
            {user ? user.email : 'UserID'}
          </Text>
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>닉네임</Text>
          <TextInput
            value={nickname}
            onChangeText={setNickName}
            style={{ paddingVertical: 3, borderWidth: 1, borderColor: '#cfcfcf', borderRadius: 5, padding: 5 }}
          />
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>주소</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            style={{ borderWidth: 1, borderColor: '#cfcfcf', borderRadius: 5, padding: 5 }}
          />
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>휴대폰번호</Text>
          <TextInput
            value={phoneNumber}
            onChangeText={setPhone}
            style={{ borderWidth: 1, borderColor: '#cfcfcf', borderRadius: 5, padding: 5 }}
          />
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontWeight: 'bold' }}>상품을 판매하실 의향이 있으신가요?</Text>
          <RadioButtonGroup
            containerStyle={{ padding: 1, marginTop: 5, flexDirection: 'row' }}
            selected={currentWilling}
            onSelected={setCurrentWilling}
            radioBackground="rgba(10,150,240,1)"
          >
            <RadioButtonItem value="yes" label="Yes" />
            <RadioButtonItem value="no" label="No" style={{ marginLeft: 10 }} />
          </RadioButtonGroup>
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 13, fontWeight: 'bold' }}>
            개인/기업(선택) - 개인이신가요? 아니면 비즈니스 계정이신가요?
          </Text>
          <RadioButtonGroup
            containerStyle={{ padding: 1, marginTop: 5, flexDirection: 'row' }}
            selected={personalOrCompany}
            onSelected={setPersonalOrCompany}
            radioBackground="rgba(10,150,240,1)"
          >
            <RadioButtonItem value="personal" label="개인" />
            <RadioButtonItem value="company" label="기업" style={{ marginLeft: 10 }} />
          </RadioButtonGroup>
        </View>
        {personalOrCompany === 'company' && (
          <View>
            <Text>*회사명:</Text>
            <TextInput value={company} onChangeText={setCompany} />
          </View>
        )}
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={handleSubmit}
            style={{ width: 110, height: 60, backgroundColor: 'rgba(10,100,220,1)' }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', lineHeight: 60, fontSize: 18 }}>
              적용하기
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
