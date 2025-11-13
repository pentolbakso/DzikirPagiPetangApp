import * as React from 'react';
import {Pressable, View, ViewStyle} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {MD3DarkTheme, MD3LightTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../rematch/store';
import {useNavigation} from '@react-navigation/native';

const mainColors = [
  {color: '#B71C1C', name: 'Deep Crimson'}, // primaryContainer: light pink ~#FFDAD6
  {color: '#F57F17', name: 'Golden Amber'}, // primaryContainer: pale yellow ~#FFECB3
  {color: '#006064', name: 'Deep Cyan'}, // primaryContainer: light teal ~#B2EBF2
  {color: '#0D47A1', name: 'Royal Blue'}, // primaryContainer: pale blue ~#BBDEFB
  {color: '#4A148C', name: 'Deep Violet'}, // primaryContainer: light purple ~#E1BEE7
  {color: '#880E4F', name: 'Berry Wine'}, // primaryContainer: soft pink ~#F8BBD0
  {color: '#1B5E20', name: 'Forest Emerald'}, // primaryContainer: mint ~#C8E6C9
  {color: '#827717', name: 'Olive Gold'}, // primaryContainer: cream ~#F0F4C3
];

const ColorView = ({
  color,
  isDarkMode,
  style,
  onPress,
  active,
}: {
  color: string;
  isDarkMode: boolean;
  style?: ViewStyle;
  onPress: (color: string) => void;
  active: boolean;
}) => {
  return (
    <Pressable onPress={() => onPress(color)}>
      <View
        style={{
          height: 50,
          borderRadius: 10,
          overflow: 'hidden',
          ...style,
        }}>
        <View style={{flexDirection: 'row', flex: 1}}></View>
      </View>
    </Pressable>
  );
};

const PaletteScreen = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch<Dispatch>();
  const themeColor = useSelector((state: RootState) => state.app.themeColor);
  const isDarkMode = useSelector((state: RootState) => state.app.darkMode);

  const handlePress = React.useCallback(
    (color: string) => {
      dispatch.app.setThemeColor(color);
      navigate.goBack();
    },
    [dispatch],
  );

  return (
    <ScrollView style={{flex: 1, padding: 15}}>
      {mainColors.map((it, id) => (
        <ColorView
          key={id}
          color={it.color}
          isDarkMode={isDarkMode}
          style={{marginBottom: 15}}
          onPress={handlePress}
          active={it.color == themeColor}
        />
      ))}
    </ScrollView>
  );
};
export default PaletteScreen;
