import * as React from 'react';
import {View, Platform, TouchableOpacity, Dimensions} from 'react-native';
import {TouchableOpacity as GHTouchableOpacity} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';
import {space, layout} from 'styled-system';

import {LabelComponent} from '../assets/components';

const SCREEN_WIDTH = Dimensions.get('window').width;
const OBJECT_PADDING = 15;
const OBJECT_COLUMN = 2;
const OBJECT_WIDTH = Math.floor(
  (SCREEN_WIDTH - OBJECT_PADDING * (OBJECT_COLUMN + 1)) / 2,
);

const Touchable = Platform.OS === 'ios' ? GHTouchableOpacity : TouchableOpacity;
const TouchContent = styled(Touchable)(
  {
    padding: 10,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    width: OBJECT_WIDTH,
    marginLeft: OBJECT_PADDING,
    marginBottom: OBJECT_PADDING,
  },
  space,
  layout,
);

const FeedRow = (props) => {
  const item = props?.item;

  // MARK: -

  const {name, thumbnail} = item;
  const {path, extension} = thumbnail;

  return (
    <TouchContent
      activeOpacity={0.85}
      onPress={() => {
        if (props?.onPress) {
          props?.onPress();
        }
      }}
      {...props}>
      <>
        <FastImage
          style={{
            backgroundColor: '#f3f3f3',
            height: OBJECT_WIDTH * 1.2,
            width: '100%',
            // marginTop: 0,
            borderRadius: 13,
          }}
          source={{
            uri: `${path}.${extension}`,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />

        <View
          style={{
            paddingHorizontal: 5,
            marginBottom: 10,
          }}>
          <LabelComponent fontSize={18} fontWeight="bold" mt={15}>
            {name?.trim()}
          </LabelComponent>
        </View>
      </>
    </TouchContent>
  );
};

export default FeedRow;
