import React from 'react';
import {View} from 'react-native';
import moment from 'moment';
import styled from 'styled-components';
import {space, typography, color, flexbox} from 'styled-system';

import {LabelComponent} from '../assets/components';

const Content = styled(View)(
  {
    marginLeft: 35,
    backgroundColor: 'transparent',
  },
  space,
  typography,
  color,
  flexbox,
);

function FeedDetailHeader({item}) {
  const {name, modified} = item;
  const updated = moment(modified, 'YYYY-MM-DD HH:mm:ss').format(
    'DD MMM, YYYY',
  );

  return (
    <Content>
      <LabelComponent fontSize={12} fontWeight="700" mt={20} color="#EA5E32">
        DETAIL
      </LabelComponent>

      <LabelComponent
        fontSize={18}
        fontWeight="500"
        mt={10}
        mr={40}
        color="#080230">
        {name?.trim()}
      </LabelComponent>

      <LabelComponent fontSize={13} fontWeight="600" mt={15} color="#8F8F91">
        {`Last updated  ${updated}`}
      </LabelComponent>
    </Content>
  );
}

export default FeedDetailHeader;
