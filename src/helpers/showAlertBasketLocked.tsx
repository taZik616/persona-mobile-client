import {Alert} from 'react-native'

export const showAlertBasketLocked = () => {
  Alert.alert(
    'Корзина не доступна',
    'Для того чтобы иметь доступ к пользованию корзиной нужно пройти аутентификацию',
    undefined,
    {cancelable: true},
  )
}
