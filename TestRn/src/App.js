import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './app/store';
import { MyTabs } from './components/BottomTabs';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { root_styles } from './styles/root_styles/styles';
import { getUserLocation } from './features/auth/auth_thunk';
import { Login } from './components/SignIn-Up/Login';

const Stack = createNativeStackNavigator();

const App = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const token = useSelector((val) => val.userAuth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserLocation());

    if (!token) {
      setShowLoginModal(!showLoginModal);
    }
  }, []);

  return (
    <SafeAreaView style={root_styles.safeArea}>
      <NavigationContainer>
        {token ? (
          <MyTabs />
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
