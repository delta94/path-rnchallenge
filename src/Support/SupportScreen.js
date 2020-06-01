import * as React from 'react';
import {ActivityIndicator, StatusBar, Platform} from 'react-native';
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/Feather';

import {ButtonNavigationComponent} from '../assets/components';

function SupportScreen({route, navigation}) {
  const [loading, setLoading] = React.useState(true);

  // MARK: -

  navigation.setOptions({
    headerLeft: () => (
      <ButtonNavigationComponent
        type="dark"
        onPress={navigation.openDrawer}
        ml={10}>
        <Icon name="menu" size={22} />
      </ButtonNavigationComponent>
    ),

    headerRight: () =>
      loading === true ? (
        <ButtonNavigationComponent mr={10}>
          <ActivityIndicator color="black" />
        </ButtonNavigationComponent>
      ) : null,
  });

  // MARK: - Screen Focus Hooks

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      StatusBar.setBarStyle('dark-content', false);

      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('white', true);
      }
    });

    return unsubscribe;
  }, [navigation]);

  // MARK: - View Lifecycle

  function onNavigationStateChange(webViewState) {
    const {url} = webViewState;

    if (url.includes('success=true')) {
      navigation.goBack();
    }
  }

  return (
    <WebView
      source={{uri: route.params?.uri}}
      onNavigationStateChange={onNavigationStateChange}
      originWhitelist={['*']}
      useWebKit={true}
      onLoadStart={() => {
        setLoading(true);
      }}
      onLoadEnd={() => {
        setLoading(false);
      }}
    />
  );
}

export default SupportScreen;
