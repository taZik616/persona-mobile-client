import React from 'react'

import {StyleSheet, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import {Color} from 'src/themes'
import {DEFAULT_HITSLOP} from 'src/variables'

import {IconButton} from '../IconButton'
import {Text} from '../Text'

export type HeaderButtonProps = {
  onPress?: () => void
  disabled?: boolean
  iconColor?: string
  icon?: string
  text?: string
  /* i18n?: I18N; */
}

export function HeaderButton({
  onPress,
  disabled,
  iconColor,
  icon,
  text,
}: HeaderButtonProps) {
  if (icon) {
    return (
      <IconButton
        disabled={disabled}
        onPress={() => onPress?.()}
        hitSlop={DEFAULT_HITSLOP}>
        {icon && (
          <Icon
            name={icon}
            size={22}
            color={iconColor ? iconColor : Color.textBase1}
          />
        )}
      </IconButton>
    )
  }

  if (text /*|| i18n*/) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text gp1 color={disabled ? Color.textBase1 : iconColor} center>
          {text}
        </Text>
      </TouchableOpacity>
    )
  }

  return <View style={styles.spacer} />
}

const styles = StyleSheet.create({
  spacer: {
    width: 24,
    height: 24,
  },
})
