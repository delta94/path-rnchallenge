import * as React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import {space, layout, border} from 'styled-system';

import {LabelComponent, ButtonComponent} from '.';

const BoxContent = styled(View)(
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  space,
  layout,
  border,
);

const AvatarComponent = ({...props}) => (
  <BoxContent {...props}>
    {props?.image}

    <LabelComponent
      fontSize={15}
      fontWeight="700"
      mt={props?.image ? 30 : 0}
      color={props?.style === 'dark-content' ? '#FFF' : '#212121'}>
      {props?.title}
    </LabelComponent>
    <LabelComponent
      mt={10}
      ml={35}
      mr={35}
      fontSize={15}
      textAlign="center"
      color={props?.style === 'dark-content' ? '#FFF' : '#212121'}>
      {props?.description}
    </LabelComponent>

    {props?.buttonTitle ? (
      <ButtonComponent type="info" mt={35} onPress={props?.onPress}>
        {props?.buttonTitle}
      </ButtonComponent>
    ) : null}
  </BoxContent>
);

export default AvatarComponent;
