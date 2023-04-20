import React, {useMemo} from 'react'

import {StyleSheet, View, ViewProps} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

export type SpacerProps = ViewProps & {
  height?: number
  width?: number
  withBottomInsets?: boolean
  withTopInsets?: boolean
}

export const Spacer = ({
  children,
  style,
  height,
  withBottomInsets,
  withTopInsets,
  width,
  ...props
}: SpacerProps) => {
  const {bottom, top} = useSafeAreaInsets()
  const container = useMemo(() => {
    const hasSizeProp = !(height == null) || !(width == null)
    return [
      hasSizeProp ? {height, width} : styles.flexOne,
      {
        paddingBottom: withBottomInsets ? bottom : 0,
        paddingTop: withTopInsets ? top : 0,
      },
      style,
    ].filter(Boolean)
  }, [style, height, width, top, withTopInsets])

  return (
    <View style={container} {...props}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  flexOne: {flex: 1},
})
