import React from 'react'

import {StyleSheet, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import {Color} from 'src/themes'

import {Text} from '../ui/Text'

interface SettingsButtonProps {
  onPress: () => void
  title?: string
  icon: string
}

export function SettingsButton({onPress, title, icon}: SettingsButtonProps) {
  return (
    <TouchableOpacity
      style={styles.buttonStyle}
      activeOpacity={0.7}
      onPress={onPress}>
      <View style={styles.containerTextChevron}>
        <View style={styles.circleIconContainer}>
          <Icon name={icon} style={styles.iconStyle} />
        </View>
        <Text gp2 style={styles.textStyle}>
          {title}
        </Text>
      </View>
      <Icon name="chevron-forward" style={styles.chevronStyle} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  iconStyle: {
    fontSize: 25,
    color: Color.primary,
  },
  buttonStyle: {
    justifyContent: 'space-between',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: Color.primaryGray,
  },
  textStyle: {
    marginLeft: 15,
  },
  chevronStyle: {
    fontSize: 25,
    color: Color.primary,
  },
  containerTextChevron: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleIconContainer: {
    height: 50,
    width: 50,
    borderRadius: 999,
    backgroundColor: Color.primaryGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
