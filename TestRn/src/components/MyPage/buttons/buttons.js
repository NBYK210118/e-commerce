import { AntDesign, Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { primary_gray } from '../../../styles/common/colors';

export const MoveButton = ({ label, navigate, name }) => {
  const navigation = useNavigation();
  const handleMoveTab = () => {
    navigation.navigate(navigate);
  };
  if (name === 'edit') {
    return (
      <TouchableOpacity style={manage_btns_style.one_row} onPress={handleMoveTab}>
        <View style={manage_btns_style.other_box}>
          <Entypo name={name} size={24} color="black" />
          <Text style={manage_btns_style.other_text}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  } else if (name === 'th-list') {
    return (
      <TouchableOpacity style={manage_btns_style.one_row} onPress={handleMoveTab}>
        <View style={manage_btns_style.other_box}>
          <FontAwesome name={name} size={24} color="black" />
          <Text style={manage_btns_style.other_text}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  } else if (name === 'question-answer') {
    return (
      <TouchableOpacity style={manage_btns_style.one_row} onPress={handleMoveTab}>
        <View style={manage_btns_style.other_box}>
          <MaterialIcons name={name} size={24} color="black" />
          <Text style={manage_btns_style.other_text}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  }
};

export const ManageButtons = () => {
  return (
    <>
      <TouchableOpacity style={manage_btns_style.one_row}>
        <View style={manage_btns_style.box}>
          <Image source={{ uri: 'https://via.placeholder.com/80' }} style={manage_btns_style.img} />
          <View style={manage_btns_style.card_info}>
            <Text style={manage_btns_style.card_text}>카드사:</Text>
            <Text style={manage_btns_style.card_text}>카드번호:1011-****-**42-88**</Text>
          </View>
          <TouchableOpacity style={manage_btns_style.plus}>
            <AntDesign name="plus" color="black" style={manage_btns_style.icon} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <MoveButton name="edit" label="내 프로필 수정하기" navigate="Profile" />
      <MoveButton name="th-list" label="내 판매상품 관리하기" navigate="My Sellings" />
      <MoveButton name="question-answer" label="내 문의사항(0)" navigate="Questions" />
    </>
  );
};

const manage_btns_style = StyleSheet.create({
  one_row: {
    borderWidth: 1,
    borderColor: primary_gray,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 10,
  },
  box: { display: 'flex', flexDirection: 'row' },
  img: { width: 60, height: 45, borderRadius: 4 },
  card_info: { display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  card_text: { fontSize: 11, marginVertical: 2, marginHorizontal: 15 },
  plus: {
    borderWidth: 1,
    borderColor: primary_gray,
    borderRadius: 100,
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  icon: { fontSize: 28 },
  other_box: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
  other_text: { fontWeight: 'bold', fontSize: 15, marginLeft: 10 },
});
