import notifee, {AuthorizationStatus} from '@notifee/react-native'

import {useTypedDispatch} from 'src/store'
import {setAllowAppNotification} from 'src/store/profileSlice'

const selectAllowNotification = (st: any) => st.profile.allowAppNotification

export const useNotifeePermissions = () => {
  const dispatch = useTypedDispatch()
  // const isAllowed = useTypedSelector(selectAllowNotification)

  /**
   * @return `isAllowed: boolean`
   */
  const requestNotification = async () => {
    const res = await notifee.requestPermission()

    res.authorizationStatus
    switch (res.authorizationStatus) {
      // case AuthorizationStatus.PROVISIONAL:
      case AuthorizationStatus.AUTHORIZED:
        console.log('🚀 - Notifications allowed)')
        dispatch(setAllowAppNotification(true))
        return true
      default:
        console.log('🚀 - Notifications denied)')
        dispatch(setAllowAppNotification(false))
        return false
    }
  }

  return {requestNotification}
}
