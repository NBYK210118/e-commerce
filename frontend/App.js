import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import { useCallback } from 'react';
import { Stack, Tab } from './src/components/common';
import { ProductDetail } from './src/components/ProductDetail/index';
import { AntIcon } from './src/components/icons/icons';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Alert, StatusBar } from 'react-native';
import { setAccessToGallery } from './src/features/auth/auth_slice';
import { getUserLocation } from './src/features/auth/auth_thunk';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HomeScreen } from './src/components/Home/index';
import { Likes } from './src/components/Likes/index';
import { ShoppingCart } from './src/components/ShoppingCart/index';
import { MyPageStackScreen } from './src/components/Tabs/MyPageStackScreen';
import { SignUp } from './src/components/SignIn-Up/SignUp';
import { Login } from './src/components/SignIn-Up/Login';
import { store } from './src/app/store';

const ProductDetailStack = () => {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const showHeader = navigation.setOptions({ headerShown: false });

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
          headerTitle: 'CAVE',
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
      Alert.alert('로그아웃', '성공적으로 로그아웃되었습니다!');
    } catch (error) {
      Alert.alert('로그아웃', '죄송합니다. 다시 시도해주세요');
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
        tabBarStyle: { display: route.name === 'Product' ? 'none' : 'flex' },
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
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    alignItems: 'center',
  },
});
