import * as React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import DzikirScreen from '../screens/Dzikir';
import SettingScreen from '../screens/Setting';
import {useColorScheme} from 'react-native';
import {Colors} from '../colors';
import {useSelector} from 'react-redux';
import {RootState} from '../rematch/store';
import PaletteScreen from '../screens/Palette';

const Stack = createStackNavigator();

const MyLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.lightBlue,
    background: Colors.white,
    card: '#eee',
  },
};
const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#1a1a1a',
    card: '#333',
  },
};

const Navigator = ({theme}: {theme: Theme | undefined}) => {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {},
          // headerTintColor: '#333',
          headerShown: false,
          headerBackTitleVisible: false,
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerTitle: 'Home'}}
        />
        <Stack.Screen
          name="Dzikir"
          component={DzikirScreen}
          options={{headerTitle: 'Dzikir', gestureEnabled: false}}
        />
        <Stack.Screen
          name="Setting"
          component={SettingScreen}
          options={{headerTitle: 'Pengaturan', headerShown: true}}
        />
        <Stack.Screen
          name="Palettes"
          component={PaletteScreen}
          options={{headerTitle: 'Warna', headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
