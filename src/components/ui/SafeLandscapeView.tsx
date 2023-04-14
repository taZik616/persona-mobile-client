import React from 'react'

import {StyleSheet, View, ViewProps} from 'react-native'

import {useHorizontalMargins} from 'src/hooks/useHorizontalMargins'

interface SafeLandscapeViewProps extends ViewProps {
  safeArea?: boolean
  center?: boolean
  type?: 'margin' | 'padding'
}

export const SafeLandscapeView = ({
  type = 'padding',
  safeArea,
  center,
  style,
  ...viewProps
}: SafeLandscapeViewProps) => {
  const {paddingHorizontal, marginHorizontal} = useHorizontalMargins({safeArea})

  return (
    <View
      style={[
        center && styles.center,
        style,
        type === 'margin' ? marginHorizontal : paddingHorizontal,
      ]}
      {...viewProps}
    />
  )
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
})
