import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { Stack, Tab } from './src/components/common';
import { ProductDetail } from './src/components/ProductDetail/index';
import { DetailOptions, HomeButton, Material, TabIcon } from './src/components/icons/icons';
import { Provider } from 'react-redux';
import { StatusBar, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HomeScreen } from './src/components/Home/index';
import { Likes } from './src/components/Likes/index';
import { MyPageStackScreen } from './src/components/Tabs/MyPageStackScreen';
import { SignUp } from './src/components/SignIn-Up/SignUp';
import { Login } from './src/components/SignIn-Up/Login';
import { store } from './src/app/store';
import { ProductList } from './src/components/ProductList';
import { ShoppingCart } from './src/components/ShoppingCart';
import { useMainState } from './src/hooks/useMainState';
import { ScrollModalScreen } from './test';

const ProductDetailStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProductDetail" component={ProductDetail} options={DetailOptions({ navigation })} />
    </Stack.Navigator>
  );
};

const ShoppingCartStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyShoppingCart" component={ShoppingCart} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const { token, address, handleLogOut, navigation } = useMainState();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size }) => <TabIcon route={route} size={size} />,
        tabBarStyle: { display: route.name === 'Product' || route.name === 'Shopping Cart' ? 'none' : 'flex' },
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
      <Tab.Screen name="ProductList" component={ProductList} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Product" component={ProductDetailStack} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Likes" component={Likes} options={DetailOptions({ navigation })} />
      <Tab.Screen
        name="Shopping Cart"
        component={ShoppingCartStack}
        options={DetailOptions({ navigation, homeStyle: { marginRight: 15 }, backStyle: { marginLeft: 15 } })}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageStackScreen}
        options={DetailOptions({ navigation, homeStyle: { marginRight: 15 }, backStyle: { marginLeft: 15 } })}
      />
      {/* <Tab.Screen name="Test" component={ScrollModalScreen} /> */}
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
            <Stack.Screen name="App" component={AppNavigator} />
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
