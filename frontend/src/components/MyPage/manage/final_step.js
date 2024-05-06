import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DropdownMenu from './Dropdown';

export const InventoryStep = ({
  count,
  setCount,
  company,
  setCompany,
  detail,
  setDetail,
  detailImgs = [],
  setDetailImgs,
  selectedItem,
  setSelectedItem,
}) => {
  const [lastTap, setLastTap] = useState(null);

  useEffect(() => {
    async () => {
      const { status } = ImagePicker.requestMediaLibraryPermissionsAsync();
      // const { capture_status } = ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('죄송합니다, 상품 등록을 위해 카메라와 갤러리 접근 권한은 허용해주시기 바랍니다');
      }
    };
  }, []);

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newDatas = result.assets.map((val) => val.uri);
      setDetailImgs([...detailImgs, ...newDatas]);
    }
  };

  const handleDoubleTab = (index) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      // 더블 탭이 감지되면 이미지 삭제
      setDetailImgs(detailImgs.filter((val, idx) => idx != index));
    } else {
      // 첫 번째 탭 시간 업데이트
      setLastTap(now);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { fontWeight: 'bold' }]}>판매사: </Text>
      <TextInput style={styles.input} value={company} onChangeText={setCompany} placeholder="판매사 입력" />
      <Text style={[styles.label, { fontWeight: 'bold' }]}>재고: </Text>
      <TextInput
        style={styles.input}
        value={String(count)}
        onChangeText={setCount}
        placeholder="재고 수량 입력"
        keyboardType="numeric"
      />
      <View style={{ marginBottom: 15 }}>
        <Text style={[styles.label, { fontWeight: 'bold' }]}>즉시 판매: </Text>
        <DropdownMenu selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      </View>
      <View>
        <Text style={[styles.label, { fontWeight: 'bold' }]}>상세정보: </Text>
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 65,
            top: -1,
            backgroundColor: 'rgba(10,200,0,1)',
            paddingVertical: 3,
            paddingHorizontal: 10,
          }}
          onPress={pickImages}
        >
          <Text style={{ color: 'rgba(235,240,240,1)' }}>파일 첨부</Text>
        </TouchableOpacity>
        {detailImgs.length > 0 && <Text style={{ color: 'gray' }}>*이미지를 두 번 탭하시면 제거됩니다</Text>}
        <TextInput
          multiline
          style={[styles.input, { paddingVertical: 10, textAlignVertical: 'center' }]}
          value={detail}
          onChangeText={setDetail}
          placeholder="상세정보 입력"
        />
        {detailImgs.length > 0 && (
          <>
            <Text style={{ color: 'black', marginBottom: 5 }}>
              첨부된 파일: <Text style={{ color: 'blue' }}>{detailImgs.length}</Text>개
            </Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} scrollEventThrottle={17}>
              {detailImgs.map((val, idx) => {
                return (
                  <TouchableOpacity key={idx} onPress={() => handleDoubleTab(idx)}>
                    <Image source={{ uri: val }} style={{ width: 100, height: 100 }} />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
});
