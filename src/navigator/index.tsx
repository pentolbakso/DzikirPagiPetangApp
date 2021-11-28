import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import AboutScreen from '../screens/Setting';
import DzikirScreen from '../screens/Dzikir';
import SettingScreen from '../screens/Setting';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
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
