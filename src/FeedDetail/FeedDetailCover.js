import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';
import {space, typography, color, flexbox} from 'styled-system';

const Content = styled(View)(
  {
    height: 200,
    width: '100%',
    marginLeft: 35,
    marginTop: 35,
    paddingLeft: 50,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderRadius: 35,
  },
  space,
  typography,
  color,
  flexbox,
);

function FeedDetailCover({item}) {
  const {path, extension} = item;

  return (
    <Content>
      <FastImage
        style={{
          backgroundColor: '#f3f3f3',
          height: '100%',
          width: '100%',
          borderRadius: 35,
        }}
        source={{
          uri: `${path}.${extension}`,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </Content>
  );
}

export default FeedDetailCover;
