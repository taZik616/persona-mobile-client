import {
  ACCESSIBLE,
  STORAGE_TYPE,
  setGenericPassword,
} from 'react-native-keychain'

interface storePasswordParams {
  user: string
  password: string
}

export const storePassword = async ({user, password}: storePasswordParams) => {
  await setGenericPassword(user, password, {
    storage: STORAGE_TYPE.AES,
    accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  })
}
