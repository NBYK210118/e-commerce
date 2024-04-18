import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../Home';
import { AntDesign } from '@expo/vector-icons';
import { ShoppingCart } from '../ShoppingCart';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/auth_thunk';

import { MaterialIcons } from '@expo/vector-icons';

import { SalesStack } from './SalesStack';
import { MyPageStackScreen } from './MyPageStackScreen';

export const Tab = createBottomTabNavigator();
export const Stack = createNativeStackNavigator();

export const MyTabs = () => {
  const token = useSelector((val) => val.userAuth.token);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const TabIcon = ({ route, size }) => {
    let iconName;

    if (route.name === 'Home') {
      iconName = 'home';
    } else if (route.name === 'Shopping Cart') {
      iconName = 'shoppingcart';
    } else if (route.name === 'MyPage') {
      iconName = 'user';
    } else if (route.name === 'Sales') {
      return <MaterialIcons name="attach-money" size={size} color="white" />;
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
      <Tab.Screen name="Sales" component={SalesStack} />
      <Tab.Screen name="Shopping Cart" component={ShoppingCart} />
      <Tab.Screen name="MyPage" component={MyPageStackScreen} />
    </Tab.Navigator>
  );
};
