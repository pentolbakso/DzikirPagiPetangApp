import * as React from 'react';
import {Pressable, useColorScheme, View, ViewStyle} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {createThemeFromSourceColor} from '../../theme/createMaterial3Theme';
import {MD3DarkTheme, MD3LightTheme, Surface} from 'react-native-paper';
import {useAppTheme} from '../../theme/useAppTheme';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../rematch/store';
import {useNavigation} from '@react-navigation/native';

const mainColors = [
  {color: '#16A085', name: 'Green Sea'},
  {color: '#2ECC71', name: 'Emerald'},
  {color: '#3498DB', name: 'Peter River'},
  {color: '#9B59B6', name: 'Amethyst'},
  {color: '#F1C40F', name: 'Sunflower'},
  {color: '#E67E22', name: 'Carrot'},
  {color: '#D35400', name: 'Pumpkin'},
  {color: '#C0392B', name: 'Pomegranate'},
  {color: '#ECF0F1', name: 'Clouds'},
  {color: '#7F8C8D', name: 'Asbestos'},
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
  const theme = React.useMemo(() => {
    const theme = createThemeFromSourceColor(color);
    return isDarkMode
      ? {...MD3DarkTheme, colors: theme.dark}
      : {...MD3LightTheme, colors: theme.light};
  }, [color, isDarkMode]);

  const activeStyle: ViewStyle = React.useMemo(
    () => (active ? {borderWidth: 3, borderColor: color} : {}),
    [active],
  );

  return (
    <Pressable onPress={() => onPress(color)}>
      <View
        style={{
          height: 50,
          borderRadius: 10,
          overflow: 'hidden',
          ...activeStyle,
          ...style,
        }}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={{flex: 1, backgroundColor: theme.colors.primary}} />
          <View
            style={{flex: 1, backgroundColor: theme.colors.primaryContainer}}
          />
          {/* <View style={{flex: 1, backgroundColor: theme.colors.secondary}} /> */}
          <View
            style={{flex: 1, backgroundColor: theme.colors.secondaryContainer}}
          />
          {/* <View
          style={{flex: 1, backgroundColor: theme.colors.tertiaryContainer}}
        /> */}
          <View
            style={{flex: 1, backgroundColor: theme.colors.tertiaryContainer}}
          />
        </View>
      </View>
    </Pressable>
  );
};

const PaletteScreen = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch<Dispatch>();
  const themeColor = useSelector((state: RootState) => state.app.themeColor);

  const isDarkMode = useColorScheme() === 'dark';

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
