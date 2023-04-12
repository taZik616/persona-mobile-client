import {useCallback} from 'react'

import {useFocusEffect} from '@react-navigation/native'
import Orientation, {OrientationType} from 'react-native-orientation-locker'

export const useScreenBlockPortrait = () => {
  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait()
      return () => Orientation.unlockAllOrientations()
    }, []),
  )
}

export const useScreenBlockCurrent = () => {
  useFocusEffect(
    useCallback(() => {
      Orientation.getOrientation(orientation => {
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
          // it's only DeviceOrientation, not Orientation
          case OrientationType['FACE-DOWN']:
          case OrientationType['FACE-UP']:
            Orientation.lockToLandscape()
            break
        }
      })

      return () => Orientation.unlockAllOrientations()
    }, []),
  )
}
