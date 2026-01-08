import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider, useSelector} from 'react-redux';
import {RootState, store} from './rematch/store';
import Navigator from './navigator';
import Loader from './Loader';
import {PaperProvider} from 'react-native-paper';
import {useAppTheme} from './theme/useAppTheme';
import {initializeNotifications} from './services/notifications';
import notifee, {EventType} from '@notifee/react-native';

// Background event handler for notifications
notifee.onBackgroundEvent(async ({type, detail}) => {
  if (type === EventType.PRESS) {
    console.log('Notification tapped in background:', detail.notification?.id);
    // Navigation will be handled when app comes to foreground
  }
});

const Content = () => {
  const {theme, navigationTheme} = useAppTheme();
  const notificationSettings = useSelector((state: RootState) => ({
    enableNotifications: state.app.enableNotifications,
    enablePagiNotification: state.app.enablePagiNotification,
    enablePetangNotification: state.app.enablePetangNotification,
    pagiNotificationTime: state.app.pagiNotificationTime,
    petangNotificationTime: state.app.petangNotificationTime,
  }));

  // Initialize notifications on app start
  React.useEffect(() => {
    initializeNotifications(notificationSettings);
  }, []);

  // Handle foreground notification events
  React.useEffect(() => {
    const unsubscribe = notifee.onForegroundEvent(({type, detail}) => {
      if (type === EventType.PRESS) {
        console.log(
          'Notification tapped in foreground:',
          detail.notification?.id,
        );
        // You can add navigation logic here if needed
      }
    });

    return unsubscribe;
  }, []);

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
