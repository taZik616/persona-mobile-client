import React from 'react'

import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native'

import {Color} from 'src/themes'

import {Text} from './Text'

interface ButtonT {
  children: string
  style?: StyleProp<ViewStyle>
  disabled?: boolean
  onPress: () => void
}
export const Button = ({children, style, onPress, disabled}: ButtonT) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
      style={[styles.container, style]}>
      <Text h4 color={Color.white}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Color.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
