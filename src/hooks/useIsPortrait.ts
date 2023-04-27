import {useCallback, useState} from 'react'

import {useFocusEffect} from '@react-navigation/native'
import Orientation, {OrientationType} from 'react-native-orientation-locker'

export function useIsPortrait() {
  const [isPortrait, setIsPortrait] = useState(true)

  useFocusEffect(
    useCallback(() => {
      const listener = (or: OrientationType) => {
        console.log('🚀 - setIsPortrait:')
        if (
          or === OrientationType['LANDSCAPE-LEFT'] ||
          or === OrientationType['LANDSCAPE-RIGHT']
        ) {
          setIsPortrait(false)
        } else {
          setIsPortrait(true)
        }
      }
      Orientation.getOrientation(listener)
      Orientation.addOrientationListener(listener)
      return () => Orientation.removeOrientationListener(listener)
    }, []),
  )

  return {isPortrait}
}
