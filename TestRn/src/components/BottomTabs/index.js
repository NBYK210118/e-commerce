import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../Home';
import { AntDesign } from '@expo/vector-icons';
import { ShoppingCart } from '../ShoppingCart';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { Likes } from '../Likes';
import { MyPage } from '../MyPage';
import { MyProfile } from '../MyPage/myProfile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { logout, updateProfile } from '../../features/auth/auth_thunk';
import { MyProducts } from '../MyPage/myProducts';
import { MaterialIcons } from '@expo/vector-icons';
import { AddProduct } from '../MyPage/add/AddProduct';

export const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyPageStackScreen = () => {
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
        navigation.goBack();
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
      <Stack.Screen name="Profile">
        {(props) => <MyProfile {...props} onChange={pickImageAsync} onSubmit={handleProfileChange} />}
      </Stack.Screen>
      <Stack.Screen name="My Products" component={MyProducts} options={{ headerShown: false }} />
      <Stack.Screen name="Add Product" component={AddProduct} />
    </Stack.Navigator>
  );
};

export const MyTabs = () => {
  const token = useSelector((val) => val.userAuth.token);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const TabIcon = ({ route, size }) => {
    let iconName;

    if (route.name === 'Home') {
      iconName = 'home';
    } else if (route.name === 'Settings') {
      iconName = 'setting';
    } else if (route.name === 'Shopping Cart') {
      iconName = 'shoppingcart';
    } else if (route.name === 'Likes') {
      iconName = 'hearto';
    } else if (route.name === 'MyPage') {
      iconName = 'user';
    }
    return <AntDesign name={iconName} size={size} color="white" />;
  };

  const MenuIcon = () => {
    return (
      <TouchableOpacity onPress={() => alert('Menu button pressed!')}>
        <AntDesign name="menu-fold" size={24} color="white" style={{ marginLeft: 15 }} />
      </TouchableOpacity>
    );
  };

  const handleLogOut = async () => {
    try {
      dispatch(logout());
      Alert.alert('로그아웃 성공', '성공적으로 로그아웃되었습니다!');
    } catch (error) {
      Alert.alert('로그아웃 에러', '로그아웃 실패! 다시 시도해주세요');
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size }) => <TabIcon route={route} size={size} />,
        tabBarStyle: { overflow: 'hidden' },
        tabBarBackground: () => (
          <LinearGradient
            colors={['#0ea5e9', '#6366f1']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        ),
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        headerBackground: () => (
          <LinearGradient
            colors={['#0ea5e9', '#6366f1']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        ),
        headerLeft: () => <MenuIcon />,
        headerRight: () =>
          token && (
            <TouchableOpacity onPress={handleLogOut}>
              <MaterialIcons name="logout" size={24} color="white" style={{ marginRight: 15 }} />
            </TouchableOpacity>
          ),
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Likes" component={Likes} />
      <Tab.Screen name="Shopping Cart" component={ShoppingCart} />
      <Tab.Screen name="MyPage" component={MyPageStackScreen} />
    </Tab.Navigator>
  );
};
