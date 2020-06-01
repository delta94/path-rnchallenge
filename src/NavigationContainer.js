import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';

import DrawerContainer from './DrawerContainer';

import FeedScreen from './FeedList/FeedScreen';
import FeedDetailScreen from './FeedDetail/FeedDetailScreen';

import SupportScreen from './Support/SupportScreen';

import {NavigationOptions} from './utilities';

import {AppLogo} from './assets/icons';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export const isMountedRef = React.createRef();
export const navigationRef = React.createRef();

function FeedContainer(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FeedScreen"
        component={FeedScreen}
        options={() => ({
          headerTitle: <AppLogo size={64} />,
          ...NavigationOptions(),
        })}
      />

      <Stack.Screen
        name="FeedDetailScreen"
        component={FeedDetailScreen}
        options={() => ({
          headerTitle: '',
          ...NavigationOptions(),
        })}
      />
    </Stack.Navigator>
  );
}

function AboutContainer(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AboutScreen"
        component={SupportScreen}
        options={() => ({
          headerTitle: 'About Us',
          ...NavigationOptions(),
        })}
        initialParams={{uri: 'https://www.path.com.tr/pages/about-us'}}
      />
    </Stack.Navigator>
  );
}

function ContactContainer(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ContactScreen"
        component={SupportScreen}
        options={() => ({
          headerTitle: 'Contact Us',
          ...NavigationOptions(),
        })}
        initialParams={{uri: 'https://www.path.com.tr/pages/contact-us'}}
      />
    </Stack.Navigator>
  );
}

function Container() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContainer {...props} />}>
        <Drawer.Screen
          name="Characters"
          component={FeedContainer}
          options={{
            drawerLabel: 'Characters',
            drawerIcon: () => {
              return <Icon name="activity" size={18} />;
            },
          }}
        />
        <Drawer.Screen
          name="About"
          component={AboutContainer}
          options={{
            drawerLabel: 'About Us',
            drawerIcon: () => {
              return <Icon name="info" size={18} />;
            },
          }}
        />
        <Drawer.Screen
          name="Contact"
          component={ContactContainer}
          options={{
            drawerLabel: 'Contact Us',
            drawerIcon: () => {
              return <Icon name="at-sign" size={18} />;
            },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Container;
