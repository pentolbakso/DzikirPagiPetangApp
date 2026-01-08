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
import {StatusBar, View, Platform} from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';

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

  // Set Android navigation bar color based on theme
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      SystemNavigationBar.setNavigationColor(
        theme.colors.background,
        theme.dark ? 'light' : 'dark',
      );
    }
  }, [theme.colors.background, theme.dark]);

  return (
    <PaperProvider theme={theme}>
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <View style={{flex: 1, backgroundColor: theme.colors.background}}>
        <Loader />
        <Navigator theme={navigationTheme} />
      </View>
    </PaperProvider>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider style={{flex: 1}}>
        <Content />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
