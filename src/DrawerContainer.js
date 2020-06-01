import React from 'react';
import {View, ActionSheetIOS, Alert, Linking, Platform} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Feather';

import {ButtonNavigationComponent, LabelComponent} from './assets/components';

const GroupHeaderContent = styled(View)({
  marginLeft: 20,
  marginBottom: 10,
  height: 40,
  borderBottomColor: '#f3f3f3',
  borderBottomWidth: 1,
  justifyContent: 'center',
});

function DrawerContainer(props) {
  const socialMedias = [
    {
      uri: 'https://twitter.com/pathcomtr',
      icon: 'twitter',
    },
    {
      uri: 'https://www.linkedin.com/company/path-internet/',
      icon: 'linkedin',
    },
  ];

  const handleOpenUri = (uri) => {
    const buttonList = ['Safari', 'Cancel'];

    const open = (t) => {
      Linking.openURL(t);
    };

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: 'Open with',
          options: buttonList,
          destructiveButtonIndex: -1,
          cancelButtonIndex: buttonList.length - 1,
        },
        (buttonIndex) => {
          if (buttonIndex !== buttonList.length - 1) {
            open(uri);
          }
        },
      );
    } else {
      Alert.alert(
        'Open with',
        null,
        [
          {
            text: 'Chrome',
            onPress: () => {
              open(uri);
            },
          },
          {
            text: 'Cancel',
            onPress: () => console.log('OK Pressed'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 30,
      }}>
      <GroupHeaderContent>
        <LabelComponent fontSize={13} fontWeight="bold">
          Menu
        </LabelComponent>
      </GroupHeaderContent>

      <DrawerItemList
        {...props}
        itemStyle={{
          marginHorizontal: 12,
          paddingHorizontal: 0,
        }}
        activeBackgroundColor="transparent"
        inactiveBackgroundColor="transparent"
        labelStyle={{
          fontSize: 15,
          color: 'black',
          marginLeft: -20,
        }}
      />

      <View style={{flex: 1}} />

      <DrawerItem
        label="Help"
        onPress={() => Linking.openURL('https://www.path.com.tr/')}
      />

      <GroupHeaderContent>
        <LabelComponent fontSize={13} fontWeight="bold">
          Social Medias
        </LabelComponent>
      </GroupHeaderContent>

      <View
        style={{
          flexDirection: 'row',
          paddingTop: 10,
        }}>
        {socialMedias.map((item) => (
          <ButtonNavigationComponent
            type="dark"
            onPress={() => handleOpenUri(item.uri)}
            ml={10}>
            <Icon name={item.icon} size={18} />
          </ButtonNavigationComponent>
        ))}
      </View>

      <View style={{height: 34}} />
    </DrawerContentScrollView>
  );
}

export default DrawerContainer;
