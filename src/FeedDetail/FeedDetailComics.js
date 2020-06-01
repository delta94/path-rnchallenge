import * as React from 'react';
import {View, Platform, TouchableOpacity} from 'react-native';
import {TouchableOpacity as GHTouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';
import {space, layout} from 'styled-system';

import {LabelComponent} from '../assets/components';

const Touchable = Platform.OS === 'ios' ? GHTouchableOpacity : TouchableOpacity;
const TouchContent = styled(Touchable)(
  {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 35,
    width: '100%',
    borderColor: '#f3f3f3',
    borderBottomWidth: 1,
  },
  space,
  layout,
);

const FeedDetailComics = (props) => {
  const item = props?.item;

  // MARK: -

  const {title, modified, thumbnail} = item;
  const {path, extension} = thumbnail;

  const released = moment(modified, 'YYYY-MM-DD HH:mm:ss').format(
    'DD MMM, YYYY',
  );

  return (
    <TouchContent
      activeOpacity={0.85}
      onPress={() => {
        if (props?.onPress) {
          props?.onPress();
        }
      }}
      {...props}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
        }}>
        <View
          style={{
            shadowColor: '#000000',
            shadowOffset: {width: 0, height: -2},
            shadowOpacity: 0.15,
            shadowRadius: 8,
          }}>
          <FastImage
            style={{
              backgroundColor: '#f3f3f3',
              height: 100,
              width: 80,
              borderRadius: 16,
            }}
            source={{
              uri: `${path}.${extension}`,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>

        <View
          style={{
            flex: 1,
            paddingLeft: 15,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}>
          <LabelComponent
            fontSize={16}
            fontWeight="700"
            pt={10}
            color="#080230">
            {title?.trim()}
          </LabelComponent>

          <LabelComponent
            fontSize={12}
            fontWeight="600"
            style={{paddingTop: 5}}
            color="#585858">
            {`Released on ${released}`}
          </LabelComponent>
        </View>
      </View>
    </TouchContent>
  );
};

export default FeedDetailComics;
