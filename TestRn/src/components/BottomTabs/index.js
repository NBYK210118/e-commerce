import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../Home';
import { AntDesign } from '@expo/vector-icons';
import { ShoppingCart } from '../ShoppingCart';
import { SettingsScreen } from '../Settings';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, TouchableOpacity, View } from 'react-native';
import { Likes } from '../Likes';
import { MyPage } from '../MyPage';

const Tab = createBottomTabNavigator();

export const MyTabs = () => {
  const MenuIcon = () => {
    return (
      <TouchableOpacity onPress={() => alert('Menu button pressed!')}>
        <AntDesign name="menu-fold" size={24} color="white" style={{ marginLeft: 15 }} />
      </TouchableOpacity>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size }) => {
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
        },
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
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Likes" component={Likes} />
      <Tab.Screen name="Shopping Cart" component={ShoppingCart} />
      <Tab.Screen name="MyPage" component={MyPage} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
