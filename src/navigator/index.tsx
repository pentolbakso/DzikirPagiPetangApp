import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import AboutScreen from '../screens/About';

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
          headerShown: true,
          headerBackTitleVisible: false,
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerTitle: 'Home'}}
        />
        <Stack.Screen
          name="Browse"
          component={AboutScreen}
          options={{headerTitle: 'About'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
