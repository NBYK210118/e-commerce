import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { MyPage } from '../MyPage';
import { MyProducts } from '../MyPage/myProducts';
import { AddProduct } from '../MyPage/manage/AddProduct';
import * as ImagePicker from 'expo-image-picker';
import { Stack } from '../common';
import { updateProfile } from '../../features/auth/auth_thunk';
import { Questions } from '../MyPage/Questions/Questions';
import { DetailOptions } from '../icons/icons';
import { MyProfile } from '../MyPage/Profile/myProfile';

export const MyPageStackScreen = () => {
  const token = useSelector((val) => val.userAuth.token);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleProfileChange = (data) => {
    if (token) {
      try {
        dispatch(updateProfile({ token, data, navigation }));
        navigation.navigate('My Page');
      } catch (error) {
        console.log('프로필 업데이트 오류');
        navigation.navigate('My Page');
      }
    }
  };

  const pickImageAsync = async ({ setSelectedImg }) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImg(result.assets[0].uri);
    } else {
      alert('선택된 사진이 없습니다');
    }
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="My Page" component={MyPage} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" options={{ headerShown: false }}>
        {(props) => <MyProfile {...props} onChange={pickImageAsync} onSubmit={handleProfileChange} />}
      </Stack.Screen>
      <Stack.Screen name="My Sellings" component={MyProducts} options={{ headerShown: false }} />
      <Stack.Screen name="Manage" component={AddProduct} />
      <Stack.Screen
        name="Questions"
        component={Questions}
        options={{
          headerSearchBarOptions: true,
          headerTransparent: false,
          headerTitle: '고객센터',
        }}
      />
    </Stack.Navigator>
  );
};
