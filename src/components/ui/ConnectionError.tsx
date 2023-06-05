import React, {memo} from 'react'

import {StyleSheet, TouchableOpacity} from 'react-native'
import Animated, {FadeIn} from 'react-native-reanimated'

import {Color} from 'src/themes'

import {Spacer, Text} from 'ui/index'

interface ConnectionErrorProps {
  onPressRetry?: () => void
  error?: string
}

export const ConnectionError = memo(
  ({onPressRetry, error}: ConnectionErrorProps) => {
    return (
      <Animated.View entering={FadeIn}>
        <Spacer height={20} />
        <Text center color={Color.textRed1} gp5>
          {error ? 'ОШИБКА' : 'ОШИБКА СОЕДИНЕНИЯ'}
        </Text>
        <Spacer height={16} />
        <Text maxWidth={400} center gp4>
          {error
            ? error
            : 'Проверьте подключение к интернету. При использовании VPN попробуйте выключить его.'}
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
  },
)
const styles = StyleSheet.create({
  btn: {
    alignSelf: 'center',
  },
})
