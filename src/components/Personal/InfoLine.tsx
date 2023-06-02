import React from 'react'

import {StyleSheet, View} from 'react-native'
import {Spacer, Text} from 'ui/index'

import {Color} from 'src/themes'

interface InfoLineProps {
  field: string
  value?: string
}

export const InfoLine = ({field, value}: InfoLineProps) => {
  return (
    <View style={styles.container}>
      <Text numberOfLines={1} gp4 color={Color.primaryGray}>
        {field}
      </Text>
      <Spacer width={8} />
      <Text numberOfLines={1} style={styles.textValue} right gp4>
        {value || '-'}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: Color.border,
    paddingBottom: 12,
    flexDirection: 'row',
  },
  textValue: {
    flex: 1,
  },
})
