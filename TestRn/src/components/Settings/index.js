import { Text, View } from 'react-native';
import { styles } from '../../styles/root_styles/styles';
import { setting_style } from '../../styles/setting_style/setting_style';

export const SettingsScreen = () => {
  return (
    <View style={setting_style.content}>
      <Text>Settings</Text>
    </View>
  );
};
