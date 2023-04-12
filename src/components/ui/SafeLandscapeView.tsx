import React from 'react'

import {View, ViewProps} from 'react-native'

import {useHorizontalMargins} from 'src/hooks/useHorizontalMargins'

interface SafeLandscapeViewProps extends ViewProps {
  safeArea?: boolean
  type?: 'margin' | 'padding'
}

export const SafeLandscapeView = ({
  type = 'padding',
  safeArea,
  style,
  ...viewProps
}: SafeLandscapeViewProps) => {
  const {paddingHorizontal, marginHorizontal} = useHorizontalMargins({safeArea})

  return (
    <View
      style={[style, type === 'margin' ? marginHorizontal : paddingHorizontal]}
      {...viewProps}
    />
  )
}
