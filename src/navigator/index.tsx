import * as React from 'react';
import {NavigationContainer, Theme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import DzikirScreen from '../screens/Dzikir';
import SettingScreen from '../screens/Setting';

const Stack = createStackNavigator();

const Navigator = ({theme}: {theme: Theme | undefined}) => {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {},
          // headerTintColor: '#333',
          headerShown: false,
          // headerBackTitleVisible: false,
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
