import { ScrollView, StyleSheet } from 'react-native';
import { WatchedProducts } from './watched/watchedProducts';
import { ManageButtons } from './buttons/buttons';
import { HeadProfile } from './headProfile';
import { useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';

export const MyPage = () => {
  const token = useSelector((val) => val.userAuth.token);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      if (!token) {
        alert('로그인이 필요합니다');
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
