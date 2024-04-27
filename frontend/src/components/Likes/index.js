import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';

export const Likes = () => {
  const token = useSelector((val) => val.userAuth.token);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      if (!token) {
        navigation.navigate('Login');
      }
    }, [token, navigation])
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Likes Tab</Text>
    </View>
  );
};
