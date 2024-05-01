import { AntDesign } from '@expo/vector-icons';
import { Alert, Modal, Pressable, Text, TextInput, View } from 'react-native';
import { primary_blue, primary_gray } from '../../styles/common/colors';

export const InventoryModal = ({ modalOpen, setModalOpen, touchSign, quantity, setQuantity, onSubmitChange }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalOpen}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalOpen(!modalOpen);
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(232, 232, 232,0.4)',
        }}
      >
        <View style={{ backgroundColor: 'white', padding: 30, borderRadius: 10 }}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>수량을 변경해주세요</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 15 }}>
            <View>
              <Pressable
                style={{ backgroundColor: 'rgba(236, 240, 241,1)', padding: 15 }}
                onPress={() => touchSign('-')}
              >
                <AntDesign name="minus" size={24} color={primary_blue} />
              </Pressable>
            </View>
            <View style={{ borderWidth: 1, borderColor: primary_gray }}>
              <TextInput
                value={quantity.toString()}
                onChangeText={(txt) => setQuantity(Number(txt))}
                keyboardType="numeric"
                style={{ width: 150, height: 50, paddingLeft: 5, fontSize: 22, textAlign: 'center' }}
              />
            </View>
            <View>
              <Pressable
                style={{ backgroundColor: 'rgba(236, 240, 241,1)', padding: 15 }}
                onPress={() => touchSign('+')}
              >
                <AntDesign name="plus" size={24} color={primary_blue} />
              </Pressable>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Pressable
              style={{
                backgroundColor: primary_gray,
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 15,
                paddingHorizontal: 45,
              }}
              onPress={() => setModalOpen(false)}
            >
              <Text style={{ fontSize: 15, color: 'gray' }}>취소</Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: primary_blue,
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 15,
                paddingHorizontal: 45,
              }}
              onPress={onSubmitChange}
            >
              <Text style={{ fontSize: 15, color: 'white', fontWeight: '600' }}>변경</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
