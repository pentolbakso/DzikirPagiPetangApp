import * as React from 'react';
import {useColorScheme} from 'react-native';
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
} from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {getTheme, ThemeColors} from './themes';
import {useSelector} from 'react-redux';
import {RootState} from '../rematch/store';

export const useAppTheme = () => {
  const isDarkMode = useSelector((state: RootState) => state.app.darkMode);

  const [themeColors, setThemeColors] = React.useState<ThemeColors>(
    getTheme('legacy'),
  );

  const {LightTheme, DarkTheme} = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const changeTheme = (name: string) => {
    const theme = getTheme(name);
    setThemeColors(theme);
  };

  const resetTheme = (sourceColor: string) => {
    changeTheme('legacy');
  };

  const paperTheme = React.useMemo(
    () =>
      isDarkMode
        ? {...MD3DarkTheme, colors: themeColors.dark}
        : {...MD3LightTheme, colors: themeColors.light},
    [isDarkMode, themeColors],
  );

  const navigationTheme = React.useMemo(
    () =>
      isDarkMode
        ? {
            ...paperTheme,
            ...DarkTheme,
            colors: {
              ...paperTheme.colors,
              ...DarkTheme.colors,
            },
          }
        : {
            ...paperTheme,
            ...LightTheme,
            colors: {
              ...paperTheme.colors,
              ...LightTheme.colors,
            },
          },
    [isDarkMode, paperTheme],
  );

  return React.useMemo(
    () => ({
      theme: paperTheme,
      changeTheme,
      navigationTheme,
    }),
    [paperTheme, changeTheme, navigationTheme],
  );
};
