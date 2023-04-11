import {useEffect, useState} from 'react'

import {useIsFocused} from '@react-navigation/native'
import Orientation, {
  OrientationType,
  useDeviceOrientationChange,
} from 'react-native-orientation-locker'

import {IS_IOS} from 'src/variables'

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
  const isFocused = useIsFocused()
  const [orientation, setOrientation] = useState(OrientationType.UNKNOWN)

  useDeviceOrientationChange(setOrientation)

  useEffect(() => {
    if (isFocused) {
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
    } else {
      Orientation.unlockAllOrientations()
    }
    return () => {
      IS_IOS && Orientation.unlockAllOrientations()
    }
  }, [isFocused])
}
