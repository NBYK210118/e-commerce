import { Pressable, ScrollView, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { entire_menus, sample_QA } from './data';
import { primary_gray } from '../../../styles/common/colors';
import { QuestionList } from './QuestionList';
import { useQuestionState } from '../../../hooks/useQuestionState';

export const Questions = () => {
  const { animatedStyle, currentQuestion, handlePress, handleTouchState, setCurrentMenu, currentMenu } =
    useQuestionState();

  return (
    <View style={{ paddingBottom: currentMenu !== '전체' ? 100 : 50 }}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: primary_gray,
          height: 50,
        }}
      >
        {entire_menus.map((item, idx) => (
          <Animated.View
            key={`box-${idx}`}
            style={[
              {
                marginHorizontal: 5,
                padding: 4,
                borderBottomColor: 'black',
              },
              animatedStyle(idx),
            ]}
          >
            <Pressable key={`touch-${idx}`} onPress={() => handlePress(item.category, idx)}>
              <Text
                style={{
                  padding: 5,
                  color: currentMenu === item.category ? 'black' : primary_gray,
                  fontWeight: currentMenu === item.category ? 'bold' : 'normal',
                }}
              >
                {item.category}
              </Text>
            </Pressable>
          </Animated.View>
        ))}
      </ScrollView>
      {currentMenu !== '전체' && (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 50,
          }}
        >
          {entire_menus.map(
            (menu, menuIndex) =>
              menu.category === currentMenu &&
              menu.sub_category.map((item, idx) => (
                <View key={`subox-${menuIndex}-${idx}`} style={[{ marginHorizontal: 5, padding: 4 }]}>
                  <Pressable onPress={() => setCurrentSubMenu(item)}>
                    <Text
                      style={{
                        padding: 5,
                        color: item === currentSubmenu ? 'black' : primary_gray,
                        fontWeight: item === currentSubmenu ? 'bold' : 'normal',
                      }}
                    >
                      {item}
                    </Text>
                  </Pressable>
                </View>
              ))
          )}
        </ScrollView>
      )}
      <QuestionList data={sample_QA} touchState={currentQuestion} handleTouchState={handleTouchState} />
    </View>
  );
};
