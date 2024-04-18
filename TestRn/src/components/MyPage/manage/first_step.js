import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import React, { useRef, useState } from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { primary_gray } from '../../../styles/common/colors';
import Modal from 'react-native-modal';

export const ImageUploadStep = (props) => {
  const accessToGallery = useSelector((state) => state.userAuth.accessToGallery);
  const categories = useSelector((state) => state.products.categories);
  const [modalVisible, setModalVisible] = useState(false);
  const scrollViewRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(null);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const selectCategory = (category) => {
    props.setCategory(category);
    closeModal();
  };

  const handleOnScroll = (event) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const handleScrollTo = (p) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(p);
    }
  };

  const pickImage = async () => {
    let permission;
    if (!accessToGallery) {
      permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permission.granted === false) {
        alert('상품 이미지 등록을 위해서 갤러리 접근 권한이 필요합니다');
      }
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.canceled === true) {
      return;
    }

    props.setImage(pickerResult.assets[0].uri);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity style={{ paddingTop: 20 }} onPress={pickImage}>
          <Text
            numberOfLines={2}
            style={{ position: 'absolute', top: '55%', left: '15%', fontSize: 14, color: 'gray', width: 140 }}
          >
            상품 이미지를 선택해주세요
          </Text>
          <Image
            source={{ uri: props.image ? props.image : 'https://via.placeholder/100' }}
            style={styles.img_preview}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputs_container}>
        <Text style={styles.label}>상품명: </Text>
        <TextInput
          style={styles.input}
          value={props.name}
          onChangeText={props.setName}
          placeholder="여기에 입력하세요"
        />
        <Text style={styles.label}>카테고리: </Text>
        <TouchableOpacity
          style={{ borderWidth: 1, borderColor: 'lightgray', padding: 10, marginBottom: 15 }}
          onPress={openModal}
        >
          <Text>{props.category ? props.category : '카테고리 선택'} </Text>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={modalVisible}
        onSwipeComplete={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        swipeDirection="down"
        scrollTo={handleScrollTo}
        scrollOffset={scrollOffset}
        scrollOffsetMax={700}
        propagateSwipe={true}
        style={styles.modal}
      >
        <View style={[styles.modalContent, { height: 500 }]}>
          <View
            style={{
              width: 100,
              position: 'absolute',
              left: '38%',
              top: '2%',
              borderWidth: 4,
              borderRadius: 10,
              borderColor: primary_gray,
            }}
          />
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => selectCategory(item.name)} style={styles.listItem}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
            onScroll={handleOnScroll}
          />
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  gray_bar: {
    position: 'absolute',
    top: '2%',
    left: '40%',
    width: 100,
    borderWidth: 4,
    zIndex: 20,
    borderColor: primary_gray,
    borderRadius: 5,
  },
  container: {
    backgroundColor: 'white',
  },
  inputs_container: {
    marginVertical: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  img_preview: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: primary_gray,
    backgroundColor: 'rgba(10,0,10,0.2)',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    padding: 10,
  },
  modalContent: {
    position: 'relative',
    backgroundColor: 'white',
    padding: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  listItem: {
    paddingHorizontal: 5,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: primary_gray,
  },
});

export default React.memo(ImageUploadStep);
