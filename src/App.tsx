import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider, useSelector} from 'react-redux';
import {store} from './rematch/store';
import Navigator from './navigator';
import Loader from './Loader';

const App = () => {
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
