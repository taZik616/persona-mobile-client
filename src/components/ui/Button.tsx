import React from 'react'

import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native'

import {Color} from 'src/themes'

import {Spacer} from './Spacer'
import {Text} from './Text'

interface ButtonT {
  children: string
  style?: StyleProp<ViewStyle>
  disabled?: boolean
  variant?: 'outline' | 'filled'
  rightIcon?: JSX.Element
  onPress?: () => void
}
export const Button = ({
  children,
  variant = 'filled',
  style,
  onPress,
  rightIcon,
  disabled,
}: ButtonT) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      disabled={disabled}
      style={[styles.container, styles[variant], style]}>
      <Text
        gp4
        center
        numberOfLines={2}
        color={variant === 'outline' ? Color.primaryBlack : Color.white}>
        {children}
      </Text>
      {rightIcon ? (
        <>
          <Spacer width={8} />
          {rightIcon}
        </>
      ) : (
        <></>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 55,
    borderRadius: 10,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  filled: {
    backgroundColor: Color.primary,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  outline: {
    borderColor: Color.primary,
    borderWidth: 1,
  },
})
