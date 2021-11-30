import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar, Platform} from 'react-native';
import {Provider, useSelector} from 'react-redux';
import {store} from './rematch/store';
import Navigator from './navigator';
import Loader from './Loader';
import {useTheme} from '@react-navigation/native';
const App = () => {
  // const theme = useTheme();
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Loader />
        <Navigator />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
