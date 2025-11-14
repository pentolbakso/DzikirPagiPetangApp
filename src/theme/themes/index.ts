import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import legacy from './legacy';

export type ThemeColors = {
  light: MD3Colors;
  dark: MD3Colors;
};

export const getTheme = (themeName: string): ThemeColors => {
  switch (themeName) {
    case 'legacy':
      return legacy;
    default:
      return legacy;
  }
};
