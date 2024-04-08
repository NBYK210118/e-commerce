import { ScrollView } from 'react-native';
import { WatchedProducts } from './watchedProducts';
import { ManageButtons } from './ManageButtons';
import { HeadProfile } from './HeadProfile';

export const MyPage = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={22}
      style={{ display: 'flex', flexDirection: 'column', marginHorizontal: 30 }}
    >
      <HeadProfile />
      <WatchedProducts />
      <ManageButtons />
    </ScrollView>
  );
};
