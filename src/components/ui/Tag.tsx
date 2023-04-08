import React from 'react'

import {StyleSheet, View} from 'react-native'

import {Color} from 'src/themes'

import {Text} from './Text'

interface TagT {
  name: string
  withMarginLeft?: boolean
}
export function Tag({name, withMarginLeft}: TagT) {
  return (
    <View
      style={[
        styles.container,
        {borderColor: Color.primary},
        withMarginLeft && styles.marginLeft,
      ]}>
      <Text color={Color.primary} l1>
        {name}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  marginLeft: {
    marginLeft: 5,
  },
})
