import {Alert} from 'react-native'

export const showAlertGiftCardLocked = () => {
  Alert.alert(
    'Подарочные карты не доступны',
    'Для того чтобы иметь доступ к покупке подарочных карт нужно пройти аутентификацию',
    undefined,
    {cancelable: true},
  )
}
