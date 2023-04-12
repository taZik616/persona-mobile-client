import React, {memo, useEffect} from 'react'

import {Pressable, StyleSheet, View, useWindowDimensions} from 'react-native'
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import {Color} from 'src/themes'

import {Spacer} from './Spacer'
import {Text} from './Text'

interface SelectorTwoOptionsProps {
  onChange?(option: string): void
  values: [string, string]
  marginHorizontal?: number
}

export const SelectorTwoOptions = memo(
  ({onChange, values, marginHorizontal = 24}: SelectorTwoOptionsProps) => {
    const translateX = useSharedValue(0)
    const isActiveTranslate = useSharedValue(false)

    const {width} = useWindowDimensions()

    useEffect(() => {
      if (translateX.value > 0 && !isActiveTranslate.value) {
        translateX.value = width / 2 - marginHorizontal + 16
      }
    }, [width])

    const handleChangeLeft = () => {
      isActiveTranslate.value = true
      translateX.value = withTiming(
        0,
        {
          duration: 450,
          easing: Easing.inOut(Easing.exp),
        },
        () => {
          isActiveTranslate.value = false
          onChange && runOnJS(onChange)(values[0])
        },
      )
    }
    const handleChangeRight = () => {
      translateX.value = withTiming(
        width / 2 - marginHorizontal + 16,
        {
          duration: 450,
          easing: Easing.inOut(Easing.exp),
        },
        () => onChange && runOnJS(onChange)(values[1]),
      )
    }

    const animFocusRect = useAnimatedStyle(() => ({
      transform: [{translateX: translateX.value}],
    }))

    return (
      <View style={{marginHorizontal}}>
        <View style={styles.container}>
          <Pressable style={styles.optionContainer} onPress={handleChangeLeft}>
            <Text numberOfLines={1} cg1>
              {values[0].toUpperCase()}
            </Text>
          </Pressable>
          <Pressable style={styles.optionContainer} onPress={handleChangeRight}>
            <Text numberOfLines={1} cg1>
              {values[1].toUpperCase()}
            </Text>
          </Pressable>
          <Animated.View style={[styles.focusRectContainer, animFocusRect]}>
            <View style={styles.focusRect} />
          </Animated.View>
        </View>
        <Spacer height={2} />
      </View>
    )
  },
)

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
