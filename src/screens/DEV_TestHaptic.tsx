import React from 'react'

import {ScrollView, StyleSheet, View} from 'react-native'
import {Button, SafeLandscapeView, Spacer, Text} from 'ui/index'

import {vibration} from 'src/services/vibration'

export const DEV_TestHapticScreen = () => {
  return (
    <ScrollView>
      <Spacer withTopInsets height={20} />
      <SafeLandscapeView safeArea>
        <View style={styles.row}>
          <Button onPress={vibration.error}>Error</Button>
          <Button onPress={vibration.warning}>Warning</Button>
        </View>
        <View style={styles.row}>
          <Button onPress={vibration.light}>Light</Button>
          <Button onPress={vibration.soft}>Soft</Button>
        </View>
        <View style={styles.row}>
          <Button onPress={vibration.success}>Success</Button>
          <Button onPress={vibration.rigid}>Rigid</Button>
        </View>
        <Text cg1>IOS only</Text>
        <Spacer height={8} />
        <Button onPress={vibration.selection}>Selection</Button>
        <Spacer height={16} />
        <Text cg1>ANDROID only</Text>
        <Spacer height={8} />
        <View style={styles.row}>
          <Button onPress={vibration.clockTick}>ClockTick</Button>
          <Button onPress={vibration.effectTick}>EffectTick</Button>
        </View>
      </SafeLandscapeView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    columnGap: 8,
    marginBottom: 8,
  },
})
