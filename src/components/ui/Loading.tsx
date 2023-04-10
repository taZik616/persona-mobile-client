import React from 'react'

import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'

import {Color} from 'src/themes'

import {Spacer} from './Spacer'
import {Text} from './Text'

interface LoadingProps {
  text?: string
  style?: StyleProp<ViewStyle>
}

export function Loading({text, style}: LoadingProps) {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size="large" color={Color.primary} />
      <Spacer height={28} />
      <Text cg1 color={Color.textBase1}>
        {text}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
