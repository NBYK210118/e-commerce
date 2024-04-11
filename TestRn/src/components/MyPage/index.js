import { ScrollView, StyleSheet } from 'react-native';
import { WatchedProducts } from './watchedProducts';
import { ManageButtons } from './ManageButtons';
import { HeadProfile } from './HeadProfile';
import { useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';

export const MyPage = () => {
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
    <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={22} style={style.container}>
      <HeadProfile />
      <WatchedProducts />
      <ManageButtons />
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: { display: 'flex', flexDirection: 'column', marginHorizontal: 30 },
});
