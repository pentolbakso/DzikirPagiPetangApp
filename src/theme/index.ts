import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  adaptNavigationTheme,
  configureFonts,
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
  MD3TypescaleKey,
} from 'react-native-paper';
import {MD3Type} from 'react-native-paper/lib/typescript/types';

const fontConfig: Partial<Record<MD3TypescaleKey, Partial<MD3Type>>> = {};

export const AppLightTheme: MD3Theme = {
  ...MD3LightTheme,
  dark: false,
  roundness: 2,
  isV3: true,
  colors: {
    primary: 'rgb(177, 45, 0)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(255, 219, 209)',
    onPrimaryContainer: 'rgb(59, 9, 0)',
    secondary: 'rgb(32, 95, 166)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(213, 227, 255)',
    onSecondaryContainer: 'rgb(0, 28, 59)',
    tertiary: 'rgb(108, 93, 47)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(246, 225, 166)',
    onTertiaryContainer: 'rgb(35, 27, 0)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(255, 251, 255)',
    onBackground: 'rgb(32, 26, 25)',
    surface: 'rgb(255, 251, 255)',
    onSurface: 'rgb(32, 26, 25)',
    surfaceVariant: 'rgb(245, 222, 216)',
    onSurfaceVariant: 'rgb(83, 67, 63)',
    outline: 'rgb(133, 115, 110)',
    outlineVariant: 'rgb(216, 194, 188)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(54, 47, 45)',
    inverseOnSurface: 'rgb(251, 238, 235)',
    inversePrimary: 'rgb(255, 181, 160)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(251, 241, 242)',
      level2: 'rgb(249, 235, 235)',
      level3: 'rgb(246, 228, 227)',
      level4: 'rgb(246, 226, 224)',
      level5: 'rgb(244, 222, 219)',
    },
    surfaceDisabled: 'rgba(32, 26, 25, 0.12)',
    onSurfaceDisabled: 'rgba(32, 26, 25, 0.38)',
    backdrop: 'rgba(59, 45, 42, 0.4)',
  },
  fonts: configureFonts({config: fontConfig}),
};

export const AppDarkTheme: MD3Theme = {
  ...MD3DarkTheme,
  dark: true,
  roundness: 2,
  isV3: true,
  colors: {
    primary: 'rgb(255, 181, 160)',
    onPrimary: 'rgb(96, 20, 0)',
    primaryContainer: 'rgb(135, 32, 0)',
    onPrimaryContainer: 'rgb(255, 219, 209)',
    secondary: 'rgb(166, 200, 255)',
    onSecondary: 'rgb(0, 49, 95)',
    secondaryContainer: 'rgb(0, 71, 135)',
    onSecondaryContainer: 'rgb(213, 227, 255)',
    tertiary: 'rgb(217, 197, 141)',
    onTertiary: 'rgb(59, 47, 5)',
    tertiaryContainer: 'rgb(83, 70, 25)',
    onTertiaryContainer: 'rgb(246, 225, 166)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(32, 26, 25)',
    onBackground: 'rgb(237, 224, 221)',
    surface: 'rgb(32, 26, 25)',
    onSurface: 'rgb(237, 224, 221)',
    surfaceVariant: 'rgb(83, 67, 63)',
    onSurfaceVariant: 'rgb(216, 194, 188)',
    outline: 'rgb(160, 140, 135)',
    outlineVariant: 'rgb(83, 67, 63)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(237, 224, 221)',
    inverseOnSurface: 'rgb(54, 47, 45)',
    inversePrimary: 'rgb(177, 45, 0)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(43, 34, 32)',
      level2: 'rgb(50, 38, 36)',
      level3: 'rgb(57, 43, 40)',
      level4: 'rgb(59, 45, 41)',
      level5: 'rgb(63, 48, 44)',
    },
    surfaceDisabled: 'rgba(237, 224, 221, 0.12)',
    onSurfaceDisabled: 'rgba(237, 224, 221, 0.38)',
    backdrop: 'rgba(59, 45, 41, 0.4)',
  },
  fonts: configureFonts({config: fontConfig}),
};

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export const CombinedDefaultTheme = {
  ...AppLightTheme,
  ...LightTheme,
  colors: {
    ...AppLightTheme.colors,
    ...LightTheme.colors,
  },
};

export const CombinedDarkTheme = {
  ...AppDarkTheme,
  ...DarkTheme,
  colors: {
    ...AppDarkTheme.colors,
    ...DarkTheme.colors,
  },
};
