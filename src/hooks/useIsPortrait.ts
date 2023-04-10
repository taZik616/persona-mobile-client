import {useState} from 'react'

import {
  OrientationType,
  useDeviceOrientationChange,
} from 'react-native-orientation-locker'

export function useIsPortrait() {
  const [isPortrait, setIsPortrait] = useState(true)

  useDeviceOrientationChange(or => {
    if (
      or === OrientationType['LANDSCAPE-LEFT'] ||
      or === OrientationType['LANDSCAPE-RIGHT']
    ) {
      setIsPortrait(false)
    } else {
      setIsPortrait(true)
    }
  })
  return {isPortrait}
}
