import {TouchableOpacity, Platform} from 'react-native';
import {TouchableOpacity as GHTouchableOpacity} from 'react-native-gesture-handler';
import styled from 'styled-components';
import {flexbox, space, layout, size} from 'styled-system';

const button = Platform.OS === 'ios' ? GHTouchableOpacity : TouchableOpacity;

const TouchableContent = styled(button)(space, layout, size, flexbox);

export default TouchableContent;
