import {useCallback, useState} from 'react'

import {useFocusEffect} from '@react-navigation/native'
import Orientation, {OrientationType} from 'react-native-orientation-locker'

export function useIsPortrait() {
  const [isPortrait, setIsPortrait] = useState(true)

  useFocusEffect(
    useCallback(() => {
      const listener = (or: OrientationType) => {
        if (
          or === OrientationType['LANDSCAPE-LEFT'] ||
          or === OrientationType['LANDSCAPE-RIGHT']
        ) {
          setIsPortrait(false)
        } else {
          setIsPortrait(true)
        }
      }
      Orientation.addDeviceOrientationListener(listener)
      return () => Orientation.removeDeviceOrientationListener(listener)
    }, []),
  )

  return {isPortrait}
}
