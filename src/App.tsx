import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider, useSelector} from 'react-redux';
import {store} from './rematch/store';
import Navigator from './navigator';
import Loader from './Loader';
import {PaperProvider} from 'react-native-paper';
import {useAppTheme} from './theme/useAppTheme';

const App = () => {
  const {updateTheme, theme, navigationTheme} = useAppTheme();

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <Loader />
          <Navigator theme={navigationTheme} />
        </PaperProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
