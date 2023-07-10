import React from 'react'

import {StyleSheet, TouchableOpacity, View} from 'react-native'

import {Color} from 'src/themes'

import {Spacer, Text} from 'ui/index'

import {CircleCheckmarkIcon} from './icons/common'

interface RadioSelectProps {
  text: string
  value: number | string
  onPress?: (text: number | string) => void
  isSelected?: boolean
  hideLine?: boolean
  disableTopMargin?: boolean
}

export const RadioSelect = ({
  text,
  value,
  onPress,
  isSelected,
  disableTopMargin,
  hideLine,
}: RadioSelectProps) => {
  return (
    <>
      {!disableTopMargin && <Spacer height={16} />}
      <View
        style={[styles.rowContainer, !hideLine && styles.border]}
        key={value}>
        <TouchableOpacity
          onPress={() => onPress?.(value)}
          style={styles.subItem}>
          <CircleCheckmarkIcon
            color={isSelected ? Color.primary : Color.secondaryGray}
          />
          <Spacer width={8} />
          <Text gp5>{text}</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomColor: Color.border,
  },
  border: {
    borderBottomWidth: 1,
  },
  subItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
