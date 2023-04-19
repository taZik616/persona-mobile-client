import React, {memo, useCallback} from 'react'

import {Pressable, StyleSheet, View} from 'react-native'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import {Easing} from 'react-native-reanimated'

import {vibration} from 'src/services/vibration'
import {Color} from 'src/themes'

import {SafeLandscapeView} from './SafeLandscapeView'
import {Text} from './Text'

type valueType = string

interface ViewTogglerProps {
  options: {
    value: valueType
    title: string
  }[]
  onStartToggle?(value: valueType): void
  onEndToggle?(value: valueType): void
}

export const ViewToggler = memo(
  ({options, onStartToggle, onEndToggle}: ViewTogglerProps) => {
    const activeItem = useSharedValue(0)

    const handleToggle = useCallback(
      (value: valueType, id: number) => () => {
        onStartToggle?.(value)
        vibration.rigid()
        activeItem.value = withTiming(
          id,
          {
            duration: 350,
            easing: Easing.inOut(Easing.exp),
          },
          finished => finished && onEndToggle && runOnJS(onEndToggle)(value),
        )
      },
      [onEndToggle, onStartToggle],
    )

    const animFocusRect = useAnimatedStyle(
      () => ({
        width: `${100 / options.length}%`,
        left: `${(100 / options.length) * activeItem.value}%`,
      }),
      [options.length],
    )

    return (
      <SafeLandscapeView safeArea type="margin" style={styles.container}>
        <Animated.View style={[styles.focusRectContainer, animFocusRect]}>
          <View style={styles.focusRect} />
        </Animated.View>
        {options.map(({value, title}, id) => (
          <Pressable
            key={value}
            onPress={handleToggle(value, id)}
            style={styles.sectionContainer}>
            <Text numberOfLines={1} center gp1>
              {title}
            </Text>
          </Pressable>
        ))}
      </SafeLandscapeView>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.secondaryGray,
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: 4,
  },
  sectionContainer: {
    flex: 1,
    height: 32,
    marginHorizontal: 4,
    paddingHorizontal: 6,
    justifyContent: 'center',
  },
  focusRectContainer: {
    position: 'absolute',
    paddingHorizontal: 4,
    alignSelf: 'center',
    alignContent: 'center',
  },
  focusRect: {
    height: 32,
    backgroundColor: Color.bg,

    borderRadius: 10,
  },
})
