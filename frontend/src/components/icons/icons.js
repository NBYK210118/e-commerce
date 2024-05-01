import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { skyblue } from '../../styles/common/colors';

export const AntIcon = ({ onPress, name, size, color, style }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <AntDesign name={name} size={size} color={color} style={style} />
    </TouchableOpacity>
  );
};

export const Material = ({ onPress, name, size, color, style }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialIcons name={name} size={size} color={color} style={style} />
    </TouchableOpacity>
  );
};

export const BackButton = ({ navigation, style }) => {
  return <AntIcon name={'left'} color={skyblue} size={24} onPress={() => navigation.goBack()} style={style} />;
};

export const HomeButton = ({ navigation, style }) => {
  return <AntIcon name={'home'} color={skyblue} size={24} onPress={() => navigation.navigate('Home')} style={style} />;
};

export const TabIcon = ({ route, size }) => {
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

export const DetailOptions = ({ navigation, homeStyle, backStyle, options }) => {
  return {
    headerShown: true,
    headerTitle: 'CAVE',
    headerLeft: () => <BackButton navigation={navigation} style={backStyle} />,
    headerRight: () => <HomeButton navigation={navigation} style={homeStyle} />,
  };
};
