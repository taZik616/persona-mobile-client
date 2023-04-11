import {useEffect, useState} from 'react'

import {useIsFocused} from '@react-navigation/native'
import Orientation, {
  OrientationType,
  useDeviceOrientationChange,
} from 'react-native-orientation-locker'

export const useScreenBlockPortrait = () => {
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      Orientation.lockToPortrait()
    } else {
      Orientation.unlockAllOrientations()
    }
    return () => Orientation.unlockAllOrientations()
  }, [isFocused])
}

export const useScreenBlockCurrent = () => {
  const [orientation, setOrientation] = useState(OrientationType.UNKNOWN)
  const isFocused = useIsFocused()

  useDeviceOrientationChange(setOrientation)

  useEffect(() => {
    console.log('🚀 - isFocused:', isFocused)
    if (isFocused) {
      // Типо чтобы в микротаску закинулось а пока до него дойдет уже очередь orientation обновиться
      // :D
      setTimeout(() => {
        switch (orientation) {
          case OrientationType['LANDSCAPE-LEFT']:
            Orientation.lockToLandscapeLeft()
            break
          case OrientationType['LANDSCAPE-RIGHT']:
            Orientation.lockToLandscapeRight()
            break
          case OrientationType.PORTRAIT:
            Orientation.lockToPortrait()
            break
          case OrientationType['PORTRAIT-UPSIDEDOWN']:
            Orientation.lockToPortraitUpsideDown()
            break
          case OrientationType['FACE-DOWN']:
          case OrientationType['FACE-UP']:
            Orientation.lockToLandscape()
            break
        }
      }, 0)
    } else {
      Orientation.unlockAllOrientations()
    }
  }, [isFocused])
}
