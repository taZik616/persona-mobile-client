import React from 'react'

import {View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

interface SafeLandscapeViewProps {
  children: JSX.Element | JSX.Element[]
}

export function SafeLandscapeView({children}: SafeLandscapeViewProps) {
  const {left, right} = useSafeAreaInsets()

  return (
    <View
      style={{
        paddingLeft: left,
        paddingRight: right,
      }}>
      {children}
    </View>
  )
}
