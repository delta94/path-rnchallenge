/**
 * @format
 */

import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';

import {name as appName} from './app.json';

// MARK: - Firebase Register

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});

// MARK: - App Register

AppRegistry.registerComponent(appName, () => App);
