import React from 'react'

import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native'
import {Spacer, Text} from 'ui/index'

import {Color} from 'src/themes'

interface ButtonT {
  children: string
  style?: StyleProp<ViewStyle>
  disabled?: boolean
  fullWidth?: boolean
  variant?: 'outline' | 'filled' | 'secondaryFilled'
  rightIcon?: JSX.Element
  onPress?: () => void
  gp4?: boolean
  gp5?: boolean
}
/**
 * @param gp4 - fontSize: 13
 * @param gp5 - fontSize: 15
 */
export const Button = ({
  children,
  variant = 'filled',
  gp4 = true,
  gp5,
  style,
  fullWidth,
  onPress,
  rightIcon,
  disabled,
}: ButtonT) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      disabled={disabled}
      style={[
        styles.container,
        styles[variant],
        fullWidth ? styles.widthFull : styles.flexOne,
        disabled && styles.disabled,
        style,
      ]}>
      <Text
        gp4={gp4 && !gp5}
        gp5={gp5}
        center
        numberOfLines={2}
        color={
          variant === 'outline'
            ? Color.primaryBlack
            : variant === 'secondaryFilled'
            ? Color.primaryBlack
            : Color.white
        }>
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
    height: 55,
    borderRadius: 10,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  widthFull: {
    width: '100%',
  },
  flexOne: {
    flex: 1,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  secondaryFilled: {
    backgroundColor: Color.secondaryGray,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  filled: {
    backgroundColor: Color.primary,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  outline: {
    borderColor: Color.primaryBlack,
    borderWidth: 1,
  },
  disabled: {
    opacity: 0.6,
  },
})
