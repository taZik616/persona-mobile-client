import React from 'react'

import {ScrollView, StyleSheet, View} from 'react-native'

import {useNotifeePermissions} from 'src/hooks/useNotifeePermissions'
import {notifications} from 'src/services/notifications'
import {vibration} from 'src/services/vibration'

import {Button, SafeLandscapeView, Spacer} from 'ui/index'

export const DEV_TestNotification = () => {
  const {requestNotification} = useNotifeePermissions()
  const sendNotification = async () => {
    const isAllowed = await requestNotification()
    if (!isAllowed) return
    notifications.show('Title', 'Body', 'Subtile')
  }
  return (
    <ScrollView>
      <Spacer withTopInsets height={20} />
      <SafeLandscapeView safeArea>
        <View style={styles.row}>
          <Button onPress={sendNotification}>sendNotification</Button>
          <Button onPress={vibration.warning}>Warning</Button>
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
