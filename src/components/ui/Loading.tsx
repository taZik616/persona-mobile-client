import React from 'react'

import {ActivityIndicator, StyleProp, StyleSheet, ViewStyle} from 'react-native'
import Animated, {FadeIn} from 'react-native-reanimated'

import {Color} from 'src/themes'

import {Spacer} from './Spacer'
import {Text} from './Text'

interface LoadingProps {
  text?: string
  style?: StyleProp<ViewStyle>
}

export const Loading = ({text, style}: LoadingProps) => {
  return (
    <Animated.View entering={FadeIn} style={[styles.container, style]}>
      <ActivityIndicator size="large" color={Color.primary} />
      {text && (
        <>
          <Spacer height={28} />
          <Text cg1 color={Color.textBase1}>
            {text}
          </Text>
        </>
      )}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
