import React from 'react'

import {StyleSheet, TouchableOpacity} from 'react-native'
import Animated, {FadeIn} from 'react-native-reanimated'

import {Color} from 'src/themes'

import {Spacer} from './Spacer'
import {Text} from './Text'

interface ConnectionErrorProps {
  onPressRetry?: () => void
}

export const ConnectionError = ({onPressRetry}: ConnectionErrorProps) => {
  return (
    <Animated.View entering={FadeIn}>
      <Spacer height={20} />
      <Text center color={Color.textRed1} gp5>
        ОШИБКА СОЕДИНЕНИЯ
      </Text>
      <Spacer height={20} />
      <Text maxWidth={400} center gp4>
        Проверьте подключение к интернету. При использовании VPN попробуйте
        выключить его.
      </Text>
      <Spacer height={32} />
      {onPressRetry && (
        <TouchableOpacity style={styles.btn} onPress={onPressRetry}>
          <Text center gp5 color={Color.primary}>
            Повторить попытку
          </Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'center',
  },
})
