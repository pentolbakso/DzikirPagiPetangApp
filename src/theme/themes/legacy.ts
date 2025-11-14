import {ThemeColors} from '.';
import {Colors} from '../../colors';

export default <ThemeColors>{
  light: {
    primary: '#2196f3',
    primaryContainer: '#2196f3',
    onPrimaryContainer: '#fff',
    secondary: '#FF9800',
    secondaryContainer: '#fff',
    onSecondaryContainer: '#111',
    tertiary: '#4CAF50',
    tertiaryContainer: '#C8E6C9',
    onTertiaryContainer: '#1B5E20',
    background: Colors.white,
    onBackground: '#121212',
    outline: '#000',
    outlineVariant: '#ddd',
    surface: '#eee',
    surfaceDisabled: '#ccc',
  },
  dark: {
    primary: '#90CAF9',
    primaryContainer: '#1565C0',
    onPrimaryContainer: '#E3F2FD',
    secondary: '#FFB74D',
    secondaryContainer: '#E65100',
    onSecondaryContainer: '#FFE0B2',
    tertiary: '#81C784',
    tertiaryContainer: '#1B5E20',
    onTertiaryContainer: '#C8E6C9',
    background: '#121212',
    onBackground: '#E0E0E0',
    outline: '#666',
    outlineVariant: '#444',
    surface: '#222',
    surfaceDisabled: '#333',
  },
};
