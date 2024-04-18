import { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyTabs } from './components/Tabs';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { getUserLocation, verifyToken } from './features/auth/auth_thunk';
import { Login } from './components/SignIn-Up/Login';
import { store } from './app/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { setAccessToGallery } from './features/auth/auth_slice';
import { SignUp } from './components/SignIn-Up/SignUp';

const Stack = createNativeStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const token = useSelector((val) => val.userAuth.token);
  const address = useSelector((val) => val.userAuth.address);

  if (token && status === null) {
    requestPermission();
    dispatch(setAccessToGallery(status));
  }

  useEffect(() => {
    if (address === '' || address === undefined || address === null) {
      dispatch(getUserLocation());
    }
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MyTabs} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default function Root() {
  return (
    <Provider store={store}>
      <StatusBar />
      <NavigationContainer theme={{ colors: { background: '#ffffff' } }}>
        <GestureHandlerRootView style={root_styles.safeArea}>
          <App />
        </GestureHandlerRootView>
      </NavigationContainer>
    </Provider>
  );
}

const root_styles = StyleSheet.create({
  safeArea: {
    flex: 1, // 전체 화면을 사용
    backgroundColor: 'black',
  },
});
