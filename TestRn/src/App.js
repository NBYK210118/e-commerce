import { useCallback, useEffect } from 'react';
import { Alert, Button, Pressable, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer, useFocusEffect, useNavigation, useNavigationState } from '@react-navigation/native';
import { MyTabs } from './components/Tabs';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { getUserLocation } from './features/auth/auth_thunk';
import { Login } from './components/SignIn-Up/Login';
import { store } from './app/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import { setAccessToGallery } from './features/auth/auth_slice';
import { SignUp } from './components/SignIn-Up/SignUp';
import { Stack, Tab } from './components/common';
import { AntIcon, Material } from './components/icons/icons';
import { AntDesign } from '@expo/vector-icons';
import { HomeScreen } from './components/Home';
import { ProductDetail } from './components/Home/ProductDetail';
import { Likes } from './components/Likes';
import { ShoppingCart } from './components/ShoppingCart';
import { MyPageStackScreen } from './components/Tabs/MyPageStackScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { blue1, blue2, skyblue } from './styles/common/colors';

const ProductDetailStack = () => {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const showHeader = navigation.setOptions({ headerShown: false }); // ProductDetail에 포커스 시 헤더 숨김

      return () => showHeader;
    }, [])
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{
          headerShown: true,
          headerTitle: '',
          headerLeft: () => <AntIcon name={'left'} color={skyblue} size={24} onPress={() => navigation.goBack()} />,
          headerRight: () => (
            <>
              <AntIcon name={'home'} color={skyblue} size={24} onPress={() => navigation.navigate('Home')} />
            </>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const token = useSelector((val) => val.userAuth.token);
  const address = useSelector((val) => val.userAuth.address);

  const handleLogOut = async () => {
    try {
      dispatch(logout());
      Alert.alert('로그아웃 성공', '성공적으로 로그아웃되었습니다!');
    } catch (error) {
      Alert.alert('로그아웃 에러', '로그아웃 실패! 다시 시도해주세요');
    }
  };

  if (token && status === null) {
    requestPermission();
    dispatch(setAccessToGallery(status));
  }

  useEffect(() => {
    if (address === '' || address === undefined || address === null) {
      dispatch(getUserLocation());
    }
  }, []);
  const TabIcon = ({ route, size }) => {
    let iconName;

    if (route.name === 'Home') {
      iconName = 'home';
    } else if (route.name === 'Shopping Cart') {
      iconName = 'shoppingcart';
    } else if (route.name === 'MyPage') {
      iconName = 'user';
    } else if (route.name === 'Likes') {
      iconName = 'like2';
    }
    return <AntDesign name={iconName} size={size} color="white" />;
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
        headerTitle: 'CAVE',
        headerTitleStyle: { fontSize: 20 },
        headerRight: () =>
          token ? (
            <Material name="logout" size={24} color="black" onPress={handleLogOut} style={{ marginRight: 11 }} />
          ) : null,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Product" component={ProductDetailStack} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Likes" component={Likes} />
      <Tab.Screen name="Shopping Cart" component={ShoppingCart} />
      <Tab.Screen name="MyPage" component={MyPageStackScreen} />
    </Tab.Navigator>
  );
};

export default function Root() {
  return (
    <Provider store={store}>
      <StatusBar />
      <NavigationContainer theme={{ colors: { background: '#ffffff' } }}>
        <GestureHandlerRootView style={styles.safeArea}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={AppNavigator} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Navigator>
        </GestureHandlerRootView>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // 전체 화면을 사용
    backgroundColor: 'black',
  },
});
