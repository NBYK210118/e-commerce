import { AntDesign } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { primary_gray } from '../../../styles/common/colors';

export const QuestionList = ({
  data = [],
  touchState,
  handleTouchState,
  containerStyle,
  categoryStyle,
  questionStyle,
}) => {
  if (data !== undefined && data.length > 0) {
    return (
      <ScrollView>
        {data.map((item, idx) => (
          <>
            <Pressable
              style={[
                styles.container,
                { backgroundColor: touchState === idx + 1 ? primary_gray : 'transparent' },
                { ...containerStyle },
              ]}
              key={idx}
              onPress={() => handleTouchState(idx + 1)}
            >
              <Text key={`category-${idx}`} style={[styles.category, categoryStyle]}>
                {item.category}
              </Text>
              <Text key={`question-${idx}`} numberOfLines={2} style={[styles.question, questionStyle]}>
                {item.question}
              </Text>
              <TouchableOpacity key={`touch-${idx}`}>
                <AntDesign
                  key={`icon-${idx}`}
                  name="down"
                  size={24}
                  color="black"
                  onPress={() => handleTouchState(idx + 1)}
                />
              </TouchableOpacity>
            </Pressable>
            {touchState === idx + 1 && (
              <View key={`content-${idx}`} style={[styles.content]}>
                <Text key={`detail-${idx}`} numberOfLines={3}>
                  Enim reprehenderit nisi proident laborum veniam velit eu cillum. Enim consequat incididunt fugiat
                  voluptate dolore tempor officia aliquip amet commodo aute. Proident consequat consequat duis aliquip
                  ad ad occaecat excepteur sunt adipisicing dolore sit nisi sit. Amet id ipsum ex ad eiusmod eu ut esse.
                  Cupidatat officia mollit ipsum laboris id tempor enim do non voluptate occaecat. Officia reprehenderit
                  quis officia occaecat est magna eu non non laborum eu dolore. Laboris duis tempor nulla Lorem ea
                  mollit officia ullamco ea irure qui occaecat fugiat non. Ad dolore fugiat deserunt excepteur
                  exercitation in Lorem elit magna ut quis consequat. Aliquip et nulla laborum reprehenderit consequat
                  ad nostrud. Elit eiusmod est qui labore fugiat fugiat consequat in veniam reprehenderit est. Non
                  mollit voluptate minim enim nostrud. Laborum elit consectetur occaecat aliquip enim. Qui ipsum elit
                  officia quis fugiat ullamco. Excepteur incididunt elit Lorem quis amet magna sit nostrud in enim culpa
                  voluptate. Elit elit nisi officia ut deserunt.
                </Text>
              </View>
            )}
          </>
        ))}
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: primary_gray,
  },
  category: { marginRight: 5, color: 'gray', flex: 1 },
  question: { overflow: 'hidden', flex: 5, marginRight: 10 },
  content: { padding: 15 },
});
