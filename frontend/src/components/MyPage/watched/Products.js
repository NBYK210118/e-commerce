import { Image, StyleSheet, Text, View } from 'react-native';
import { primary_gray } from '../../../styles/common/colors';

export const Products = ({ data }) => {
  return (
    <>
      {
        <View style={styles.boxes}>
          {data.map((val, idx) => (
            <View key={idx} style={styles.box}>
              <View>
                <Image style={styles.img} source={{ uri: val.images[0].imgUrl }} />
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
                  {val.name}
                </Text>
              </View>
            </View>
          ))}
        </View>
      }
    </>
  );
};

const styles = StyleSheet.create({
  boxes: { display: 'flex', flexDirection: 'row' },
  box: { display: 'flex', flexDirection: 'column', marginRight: 4 },
  img: { borderWidth: 1, borderColor: primary_gray, width: 95, height: 120 },
  name: { fontWeight: 'bold' },
});
