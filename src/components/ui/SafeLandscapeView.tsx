import React from 'react'

import {View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

interface SafeLandscapeViewProps {
  children: JSX.Element | JSX.Element[]
  additionalPadding?: number
}

export const SafeLandscapeView = ({
  children,
  additionalPadding = 0,
}: SafeLandscapeViewProps) => {
  const {left, right} = useSafeAreaInsets()

  return (
    <View
      style={{
        paddingLeft: left + additionalPadding,
        paddingRight: right + additionalPadding,
      }}>
      {children}
    </View>
  )
}
