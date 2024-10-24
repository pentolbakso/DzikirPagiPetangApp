import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider, useSelector} from 'react-redux';
import {RootState, store} from './rematch/store';
import Navigator from './navigator';
import Loader from './Loader';
import {PaperProvider} from 'react-native-paper';
import {useAppTheme} from './theme/useAppTheme';

const Content = () => {
  const themeColor = useSelector((state: RootState) => state.app.themeColor);
  const {updateTheme, theme, navigationTheme} = useAppTheme();

  React.useEffect(() => {
    updateTheme(themeColor || '#fff');
  }, [themeColor]);

  return (
    <PaperProvider theme={theme}>
      <Loader />
      <Navigator theme={navigationTheme} />
    </PaperProvider>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Content />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
