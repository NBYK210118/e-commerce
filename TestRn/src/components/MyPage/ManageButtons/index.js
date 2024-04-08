import { AntDesign, Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { manage_btns_style } from '../../../styles/mypage_style/manage_buttons/style';

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
          <View style={manage_btns_style.plus}>
            <AntDesign name="plus" color="black" style={manage_btns_style.icon} />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={manage_btns_style.one_row}>
        <View style={manage_btns_style.other_box}>
          <Entypo name="edit" size={24} color="black" />
          <Text style={manage_btns_style.other_text}>내 프로필 수정하기</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={manage_btns_style.one_row}>
        <View style={manage_btns_style.other_box}>
          <FontAwesome name="th-list" size={24} color="black" />
          <Text style={manage_btns_style.other_text}>내 판매상품 관리하기</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={manage_btns_style.one_row}>
        <View style={manage_btns_style.other_box}>
          <MaterialIcons name="question-answer" size={24} color="black" />
          <Text style={manage_btns_style.other_text}>내 문의사항(0)</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};
