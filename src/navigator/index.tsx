import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import AboutScreen from '../screens/About';
import DzikirScreen from '../screens/Dzikir';

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
          name="About"
          component={AboutScreen}
          options={{headerTitle: 'About'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
