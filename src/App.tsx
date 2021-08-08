import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar, Platform} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './rematch/store';
import Navigator from './navigator';
import Loader from './Loader';
const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar
          barStyle={Platform.OS == 'ios' ? 'dark-content' : 'light-content'}
        />
        <Loader />
        <Navigator />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
