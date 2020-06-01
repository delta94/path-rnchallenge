import { Alert } from 'react-native';

export default function Warning(title, message) {
  Alert.alert(
    title,
    message || '',
    [{ text: 'Kapat', onPress: () => {}, style: 'cancel' }],
    { cancelable: true }
  );
}
