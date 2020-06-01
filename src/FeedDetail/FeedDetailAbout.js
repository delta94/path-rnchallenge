import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import {space, typography, color, flexbox} from 'styled-system';

import {LabelComponent} from '../assets/components';

const Content = styled(View)(
  {
    margin: 35,
    backgroundColor: 'transparent',
  },
  space,
  typography,
  color,
  flexbox,
);

function FeedDetailAbout({item}) {
  const {description} = item;

  return (
    <Content>
      <LabelComponent fontSize={16} lineHeight={26} color="black">
        {description?.trim()}
      </LabelComponent>
    </Content>
  );
}

export default FeedDetailAbout;
