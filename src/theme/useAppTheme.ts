import * as React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../rematch/store';
import {Colors} from '../colors';
import {MD2LightTheme, MD2DarkTheme} from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

type AppColors = {
  primary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  background: string;
  onBackground: string;
  outline: string;
  outlineVariant: string;
  surfaceDisabled: string;
};

const lightColors: AppColors = {
  primary: Colors.lightBlue,
  primaryContainer: '#BBDEFB',
  onPrimaryContainer: '#0D47A1',
  secondary: '#FF9800',
  secondaryContainer: '#FFE0B2',
  onSecondaryContainer: '#E65100',
  tertiary: '#4CAF50',
  tertiaryContainer: '#C8E6C9',
  onTertiaryContainer: '#1B5E20',
  background: Colors.white,
  onBackground: '#121212',
  outline: '#000',
  outlineVariant: '#000',
  surfaceDisabled: '#ccc',
};

const darkColors: AppColors = {
  primary: Colors.lightBlue,
  primaryContainer: '#BBDEFB',
  onPrimaryContainer: '#0D47A1',
  secondary: '#FF9800',
  secondaryContainer: '#FFE0B2',
  onSecondaryContainer: '#E65100',
  tertiary: '#81C784',
  tertiaryContainer: '#2E7D32',
  onTertiaryContainer: '#C8E6C9',
  background: Colors.white,
  onBackground: '#121212',
  outline: '#000',
  outlineVariant: '#000',
  surfaceDisabled: '#ccc',
};

const CombinedDefaultTheme = {
  ...MD2LightTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...MD2LightTheme.colors,
    ...NavigationDefaultTheme.colors,
    ...lightColors,
  },
};
const CombinedDarkTheme = {
  ...MD2DarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...MD2DarkTheme.colors,
    ...NavigationDarkTheme.colors,
    ...darkColors,
  },
};

export type AppTheme = typeof CombinedDefaultTheme;

export const useAppTheme = () => {
  const isDarkMode = useSelector((state: RootState) => state.app.darkMode);

  const [theme, setTheme] = React.useState<AppTheme>(
    isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme,
  );

  const changeTheme = (sourceColor: string) => {
    console.log('changeTheme', sourceColor);
    // setTheme();
  };

  React.useEffect(() => {
    if (isDarkMode) {
      setTheme(CombinedDarkTheme);
    } else {
      setTheme(CombinedDefaultTheme);
    }
  }, [isDarkMode]);

  return React.useMemo(
    () => ({
      theme,
      changeTheme,
    }),
    [theme, changeTheme],
  );
};
