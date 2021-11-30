import * as React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import DzikirScreen from '../screens/Dzikir';
import SettingScreen from '../screens/Setting';
import {useColorScheme} from 'react-native';
import {Colors} from '../colors';
import {useSelector} from 'react-redux';
import {RootState} from '../rematch/store';

const Stack = createStackNavigator();

const MyDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.lightBlue,
    background: Colors.white,
    card: '#f5f5f5',
  },
};

const Navigator = () => {
  // const scheme = useColorScheme();
  const darkMode = useSelector((state: RootState) => state.app.darkMode);
  // console.log('darkMode', darkMode);
  return (
    <NavigationContainer
      // theme={MyDefaultTheme}
      theme={darkMode ? DarkTheme : MyDefaultTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            // backgroundColor: '#fff',
          },
          headerTintColor: '#333',
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
          options={{headerTitle: 'Dzikir'}}
        />
        <Stack.Screen
          name="Setting"
          component={SettingScreen}
          options={{headerTitle: 'Pengaturan', headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
