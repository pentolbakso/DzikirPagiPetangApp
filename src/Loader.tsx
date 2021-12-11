import {useTheme} from '@react-navigation/native';
import * as React from 'react';
import {AppState, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from './rematch/store';

const Loader = () => {
  const dispatch = useDispatch<Dispatch>();
  const darkMode = useSelector((state: RootState) => state.app.darkMode);

  const _startListening = () => {};

  const _stopListening = () => {};

  const _handleAppStateChange = (nextAppState: string) => {
    if (nextAppState === 'active') {
      _startListening();
    } else if (nextAppState === 'background') {
      _stopListening();
    }
  };

  React.useEffect(() => {
    _startListening();

    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      console.log('app quit? removeEventListener appStateChange');
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  return (
    <StatusBar
      barStyle={darkMode ? 'light-content' : 'dark-content'}
      backgroundColor={darkMode ? '#000' : '#fff'}
    />
  );
};

export default Loader;
