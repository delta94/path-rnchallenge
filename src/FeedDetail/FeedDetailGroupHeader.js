import React from 'react';
import {View, Platform, TouchableOpacity} from 'react-native';
import {TouchableOpacity as GHTouchableOpacity} from 'react-native-gesture-handler';
import styled from 'styled-components';
import {space, flexbox} from 'styled-system';

import {LabelComponent} from '../assets/components';

const Content = styled(View)(
  {
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#f3f3f3',
    borderBottomWidth: 1,
    elevation: 1,
    paddingHorizontal: 35,
  },
  space,
  flexbox,
);

const Touchable = Platform.OS === 'ios' ? GHTouchableOpacity : TouchableOpacity;
const TouchContent = styled(Touchable)({
  height: '100%',
  justifyContent: 'center',
});

function FeedDetailGroupHeader({title, onPress}) {
  return (
    <Content>
      <TouchContent
        activeOpacity={0.75}
        onPress={() => {
          if (onPress) {
            onPress();
          }
        }}>
        <LabelComponent
          fontSize={14}
          fontWeight="bold"
          lineHeight={26}
          color="black">
          {title}
        </LabelComponent>
      </TouchContent>
    </Content>
  );
}

export default FeedDetailGroupHeader;
