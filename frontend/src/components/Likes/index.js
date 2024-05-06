import React from 'react';
import { View, StyleSheet, Text, FlatList, Pressable } from 'react-native';
import { MenuBar } from '../Home/menu_bar';
import { light_green, primary_blue } from '../../styles/common/colors';
import { useLikeStates } from '../../hooks/useLikeStates';
import { LikesItem } from './ProductItem';

export const Likes = () => {
  const {
    activeMenu,
    setActiveMenu,
    borderWidths,
    categories,
    dataSet,
    likesStatus,
    setSelectedMenu,
    toggleLike,
    visibleOption,
    handleShowAll,
  } = useLikeStates();

  return (
    <View style={styles.topWrapper}>
      <MenuBar
        active={activeMenu}
        setActive={setActiveMenu}
        setSelected={setSelectedMenu}
        menus={categories}
        menuValues={borderWidths}
        color={light_green}
        nothingChecked={true}
      />
      <View style={styles.header}>
        <View style={styles.length_wrap}>
          <Text>
            총 <Text style={styles.length}>{dataSet.length}</Text>개의 상품을 좋아합니다
          </Text>
        </View>
        {visibleOption && (
          <View style={styles.showAll}>
            <Pressable onPress={() => handleShowAll()}>
              <Text style={styles.button_txt}>전체 보기</Text>
            </Pressable>
          </View>
        )}
      </View>

      <FlatList
        data={dataSet}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <LikesItem product={item} toggleLike={toggleLike} likesStatus={likesStatus} />}
        style={styles.scrollView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 4 },
  scrollView: {
    backgroundColor: '#f5f5f5',
  },
  showAll: {
    padding: 5,
    marginRight: 15,
    borderRadius: 4,
    backgroundColor: '#3CB371',
  },
  length_wrap: { padding: 5, marginLeft: 15 },
  length: { color: primary_blue, fontWeight: 'bold' },
  button_txt: { color: 'white' },
});
