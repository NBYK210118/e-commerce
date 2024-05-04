import { Pressable, Text, View } from 'react-native';
import { MenuBar } from '../../Home/menu_bar';
import { useEffect, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { primary_gray } from '../../../styles/common/colors';
import { Contents } from './Contents';
import { AnimateHoc } from './test';

export const Questions = () => {
  let datas = ['전체', '배송', '교환/취소(반품)', '서비스', '주문/결제', '상품확인', '회원정보'];
  const [active, setActive] = useState('');
  const [currentMenu, setCurrentMenu] = useState(datas[0]);
  const borderWidths = [...Array(datas.length)].map(() => useSharedValue(0));

  return (
    <View>
      <MenuBar
        setActive={setActive}
        setSelected={setCurrentMenu}
        active={active}
        menuValues={borderWidths}
        menus={datas}
        color={'black'}
        containerStyle={{ padding: 10 }}
      />
      <Contents currentMenu={currentMenu} />
    </View>
  );
};
