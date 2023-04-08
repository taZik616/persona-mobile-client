import React, {useEffect, useState} from 'react'

import {Pressable, StyleSheet, View, useWindowDimensions} from 'react-native'
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import {Color} from 'src/themes'

import {Text} from './Text'

interface SelectorTwoOptionsProps {
  onChange?(option: string): void
  values: [string, string]
  marginHorizontal?: number
}

export function SelectorTwoOptions({
  onChange,
  values,
  marginHorizontal = 0,
}: SelectorTwoOptionsProps) {
  const translateX = useSharedValue(0)
  const [isActiveTranslate, setIsActiveTranslate] = useState(false)
  const {width} = useWindowDimensions()

  useEffect(() => {
    if (translateX.value > 0 && !isActiveTranslate) {
      translateX.value = width / 2 - marginHorizontal + 16
    }
  }, [width])

  const handleChangeLeft = () => {
    setIsActiveTranslate(true)
    translateX.value = withTiming(
      0,
      {
        duration: 450,
        easing: Easing.inOut(Easing.exp),
      },
      () => {
        runOnJS(setIsActiveTranslate)(false)
      },
    )
    onChange?.(values[0])
  }
  const handleChangeRight = () => {
    translateX.value = withTiming(width / 2 - marginHorizontal + 16, {
      duration: 450,
      easing: Easing.inOut(Easing.exp),
    })
    onChange?.(values[1])
  }

  const animFocusRect = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }))
  return (
    <View style={{marginHorizontal}}>
      <View style={styles.container}>
        <Pressable style={styles.optionContainer} onPress={handleChangeLeft}>
          <Text numberOfLines={1} cg1>
            {values[0]}
          </Text>
        </Pressable>
        <Pressable style={styles.optionContainer} onPress={handleChangeRight}>
          <Text numberOfLines={1} cg1>
            {values[1]}
          </Text>
        </Pressable>
        <Animated.View style={[styles.focusRectContainer, animFocusRect]}>
          <View style={styles.focusRect} />
        </Animated.View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
  },
  optionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 34,
    paddingHorizontal: 6,
  },
  focusRectContainer: {
    position: 'absolute',
    width: '50%',
    paddingRight: 16,
  },
  focusRect: {
    height: 35,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Color.primary,
    width: '100%',
  },
})
