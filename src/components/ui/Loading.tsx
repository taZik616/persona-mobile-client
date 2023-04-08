import React from 'react'

import {ActivityIndicator, StyleSheet, View} from 'react-native'

import {Color} from 'src/themes'

import {Text} from './Text'

interface LoadingProps {
  text?: string
}

export function Loading({text}: LoadingProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Color.primary} />
      <Text gp1 color={Color.textBase1}>
        {text}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
