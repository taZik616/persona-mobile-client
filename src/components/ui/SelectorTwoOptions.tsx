import React, {memo, useEffect} from 'react'

import {Pressable, StyleSheet, View, useWindowDimensions} from 'react-native'
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import {Spacer, Text} from 'ui/index'

import {useGender} from 'src/hooks'
import {vibration} from 'src/services/vibration'
import {Color} from 'src/themes'

interface SelectorTwoOptionsProps {
  onChange?(option: string): void
  values: [string, string]
  isSecondActive?: boolean
  marginHorizontal?: number
}

export const SelectorTwoOptions = memo(
  ({
    onChange,
    values,
    isSecondActive,
    marginHorizontal = 24,
  }: SelectorTwoOptionsProps) => {
    const {width} = useWindowDimensions()
    const translateValue = width / 2 - marginHorizontal + 16

    const translateX = useSharedValue(isSecondActive ? translateValue : 0)
    const isHasTranslate = useSharedValue(!isSecondActive)

    useEffect(() => {
      translateX.value = isSecondActive ? translateValue : 0
      isHasTranslate.value = !isSecondActive
    }, [isSecondActive])

    useEffect(() => {
      if (translateX.value > 0 && !isHasTranslate.value) {
        translateX.value = translateValue
      }
    }, [width])

    const handleChangeLeft = () => {
      vibration.rigid()
      isHasTranslate.value = true
      translateX.value = withTiming(
        0,
        {
          duration: 450,
          easing: Easing.inOut(Easing.exp),
        },
        () => {
          isHasTranslate.value = false
          onChange && runOnJS(onChange)(values[0])
        },
      )
    }
    const handleChangeRight = () => {
      vibration.rigid()
      translateX.value = withTiming(
        translateValue,
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
        <Spacer height={1} />
      </View>
    )
  },
)

export const SelectorTwoOptionsGender = memo(() => {
  const {isMenSelected, onChangeGender, values} = useGender()
  return (
    <SelectorTwoOptions
      isSecondActive={isMenSelected}
      onChange={onChangeGender}
      values={values}
    />
  )
})

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
