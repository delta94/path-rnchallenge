import * as React from 'react';
import {Alert, YellowBox} from 'react-native';
import {
  SafeAreaProvider,
  initialWindowSafeAreaInsets,
} from 'react-native-safe-area-context';
import messaging, {AuthorizationStatus} from '@react-native-firebase/messaging';

import {RootContainer} from './src';

function App() {
  console.disableYellowBox = true;

  YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
  ]);

  // MARK: -

  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('New Message!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  // MARK: -

  React.useEffect(() => {
    setTimeout(() => {
      requestUserPermission();
    }, 1000);
  }, [requestUserPermission]);

  const requestUserPermission = React.useCallback(async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === AuthorizationStatus.AUTHORIZED ||
      authStatus === AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken();
      console.log('Authorization status:', authStatus);
    }
  }, []);

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      console.log('Your Firebase Token is:', fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };

  // MARK: -

  return (
    <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
      <RootContainer />
    </SafeAreaProvider>
  );
}

export default App;
