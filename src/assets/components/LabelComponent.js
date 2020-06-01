import {Text} from 'react-native';
import styled from 'styled-components';
import {space, typography, color, flexbox} from 'styled-system';

const LabelContent = styled(Text)(
  {
    color: 'black',
    backgroundColor: 'transparent',
  },
  space,
  typography,
  color,
  flexbox,
);

export default LabelContent;
