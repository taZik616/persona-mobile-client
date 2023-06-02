import React from 'react'

import {StyleSheet, TouchableOpacity} from 'react-native'
import {Spacer, Text} from 'ui/index'

interface MenuButtonProps {
  leftIcon: JSX.Element
  title: string
  onPress?: () => void
}

export const MenuButton = ({onPress, title, leftIcon}: MenuButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {leftIcon}
      <Spacer width={8} />
      <Text>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
})
