import React from 'react'

import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

import {hexColorWithOpacity} from 'src/helpers'
import {Color} from 'src/themes'

import {Spacer, Text} from 'ui/index'

interface ButtonT {
  children: string | JSX.Element
  style?: StyleProp<ViewStyle>
  disabled?: boolean
  fullWidth?: boolean
  variant?: 'outline' | 'filled' | 'secondaryFilled'
  rightIcon?: JSX.Element
  onPress?: () => void
  gp4?: boolean
  gp5?: boolean
  isLoading?: boolean
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
  isLoading,
}: ButtonT) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      disabled={isLoading || disabled}
      style={[
        styles.container,
        styles[variant],
        fullWidth ? styles.widthFull : styles.flexOne,
        disabled && styles.disabled,
        isLoading && styles[`${variant}_loading`],
        style,
      ]}>
      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator
            style={{transform: [{scale: 1.25}]}}
            size="small"
            color={Color.white}
          />
        </View>
      ) : (
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
      )}
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

const BTN_H = 55
const styles = StyleSheet.create({
  container: {
    height: BTN_H,
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
  secondaryFilled_loading: {
    backgroundColor: hexColorWithOpacity(Color.secondaryGray, 0.7),
  },
  // eslint-disable-next-line react-native/no-unused-styles
  filled: {
    backgroundColor: Color.primary,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  filled_loading: {
    backgroundColor: hexColorWithOpacity(Color.primary, 0.7),
  },
  // eslint-disable-next-line react-native/no-unused-styles
  outline: {
    borderColor: Color.primaryBlack,
    borderWidth: 1,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  outline_loading: {
    borderColor: hexColorWithOpacity(Color.primaryBlack, 0.8),
  },
  disabled: {
    opacity: 0.6,
  },
  centered: {
    height: BTN_H,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
