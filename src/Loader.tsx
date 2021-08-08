import * as React from 'react';
import {AppState} from 'react-native';
import {useDispatch} from 'react-redux';
import {Dispatch} from './rematch/store';

const Loader = () => {
  const dispatch = useDispatch<Dispatch>();

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

  return null;
};

export default Loader;
