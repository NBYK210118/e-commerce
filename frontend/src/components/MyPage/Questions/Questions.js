import { Pressable, Text, View } from 'react-native';
import { MenuBar } from '../../Home/menu_bar';
import { useEffect, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { primary_gray } from '../../../styles/common/colors';
import { Contents } from './Contents';
import { AnimateHoc } from './test';

let datas = ['전체', '배송', '교환/취소(반품)', '서비스', '주문/결제', '상품확인', '회원정보'];
export const Questions = () => {
  const [active, setActive] = useState('');
  const [selected, setSelected] = useState('');
  const borderWidths = [...Array(datas.length)].map(() => useSharedValue(0));

  useEffect(() => {
    setSelected(datas[0]);
  }, []);

  useEffect(() => {
    console.log('selected: ', selected);
  }, [selected]);

  return (
    <View>
      <MenuBar
        setActive={setActive}
        setSelected={setSelected}
        active={active}
        menuValues={borderWidths}
        menus={datas}
        color={'black'}
      />
      <Contents selected={selected} />
    </View>
  );
};
