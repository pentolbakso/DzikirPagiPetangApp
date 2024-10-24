import * as React from 'react';
import {useColorScheme} from 'react-native';
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
} from 'react-native-paper';
import {Material3Theme} from './materialThemeTypes';
import {createThemeFromSourceColor} from './createMaterial3Theme';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

export const useAppTheme = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [theme, setTheme] = React.useState<Material3Theme>(
    createThemeFromSourceColor('#6750A4'),
  );

  const {LightTheme, DarkTheme} = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const updateTheme = (sourceColor: string) => {
    console.log('updateTheme', sourceColor);
    setTheme(createThemeFromSourceColor(sourceColor));
  };

  const resetTheme = (sourceColor: string) => {
    setTheme(createThemeFromSourceColor('#6750A4'));
  };

  const paperTheme = React.useMemo(
    () =>
      isDarkMode
        ? {...MD3DarkTheme, colors: theme.dark}
        : {...MD3LightTheme, colors: theme.light},
    [isDarkMode, theme],
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
    [isDarkMode, paperTheme, theme],
  );

  return React.useMemo(
    () => ({
      theme: paperTheme,
      updateTheme,
      navigationTheme,
    }),
    [paperTheme, updateTheme, navigationTheme],
  );
};
